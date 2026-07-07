import { BhetiyoDataSource } from "../config/database.js";
import crypto from "node:crypto";

const toKebabCase = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const generateSlug = (name, title, shortId) => {
  const namePart = toKebabCase(name);
  const titlePart = toKebabCase(title);
  return `${namePart}-${titlePart}-${shortId}`;
};

export const getItems = async (req, res) => {
  try {
    const itemRepo = BhetiyoDataSource.getRepository("Item");
    const imageRepo = BhetiyoDataSource.getRepository("Image");

    const { source, search } = req.query;

    const query = itemRepo
      .createQueryBuilder("item")
      .select([
        "item.id",
        "item.group_id",
        "item.title",
        "item.category",
        "item.description",
        "item.location",
        "item.source",
        "item.slug",
        "item.created_at",
      ]);

    if (source && ["lost", "found"].includes(source.toLowerCase())) {
      query.andWhere("LOWER(item.source) = :source", { source: source.toLowerCase() });
    }

    if (search) {
      query.andWhere(
        "(item.title LIKE :search OR item.description LIKE :search OR item.location LIKE :search)",
        { search: `%${search}%` },
      );
    }

    query.orderBy("item.created_at", "DESC");

    const items = await query.getMany();

    const itemsWithImages = await Promise.all(
      items.map(async (item) => {
        const image = await imageRepo.findOne({
          where: { group_id: item.group_id },
          select: ["url"],
        });
        return {
          ...item,
          slug: item.slug || `${item.group_id}`,
          image: image?.url || null,
        };
      }),
    );

    res.status(200).json({ data: itemsWithImages, total: itemsWithImages.length });
  } catch (error) {
    console.error("Failed to fetch items:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

export const getItemByGroup = async (req, res) => {
  try {
    const { group_id } = req.params;

    const itemRepo = BhetiyoDataSource.getRepository("Item");
    const imageRepo = BhetiyoDataSource.getRepository("Image");

    const item = await itemRepo.findOne({ where: { group_id } });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const images = await imageRepo.find({
      where: { group_id },
      select: ["id", "url"],
    });

    res.status(200).json({ data: { ...item, images } });
  } catch (error) {
    console.error("Failed to fetch item:", error);
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

export const getItemBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const itemRepo = BhetiyoDataSource.getRepository("Item");
    const imageRepo = BhetiyoDataSource.getRepository("Image");
    const userRepo = BhetiyoDataSource.getRepository("User");

    let item = await itemRepo.findOne({ where: { slug } });

    if (!item) {
      item = await itemRepo.findOne({ where: { group_id: slug } });
    }

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const [images, poster] = await Promise.all([
      imageRepo.find({
        where: { group_id: item.group_id },
        select: ["id", "url"],
      }),
      item.user_id
        ? userRepo.findOne({
            where: { id: item.user_id },
            select: ["id", "name", "email"],
          })
        : Promise.resolve(null),
    ]);

    res.status(200).json({ data: { ...item, images, poster } });
  } catch (error) {
    console.error("Failed to fetch item by slug:", error);
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

export const storeItem = async (req, res) => {
  try {
    const imageRepo = BhetiyoDataSource.getRepository("Image");
    const itemRepo = BhetiyoDataSource.getRepository("Item");
    const { title, category, dateFound, description, location, source } = req.body;
    const imageLink = req.uploadedData;
    const groupId = crypto.randomUUID();

    const slug = generateSlug(req.user.name, title, groupId.split("-")[0]);

    await itemRepo.save({
      group_id: groupId,
      user_id: req.user.id,
      title,
      category,
      dateFound,
      description,
      location,
      source,
      slug,
    });

    const savedImages = await Promise.all(
      imageLink.map((data) =>
        imageRepo.save({
          url: data.url,
          vector_value: data.vector,
          group_id: groupId,
        }),
      ),
    );

    res.status(201).json({
      message: "Item stored successfully",
      data: { groupId, images: savedImages.map((img) => ({ id: img.id, url: img.url })) },
    });
  } catch (error) {
    console.error("Failed to store item:", error);
    res.status(500).json({ error: "Failed to store item" });
  }
};
