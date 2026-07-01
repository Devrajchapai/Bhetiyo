import { BhetiyoDataSource } from "../config/database.js";
import crypto from "node:crypto";

export const storeItem = async (req, res) => {
  try {
    const imageRepo = BhetiyoDataSource.getRepository("Image");
    const itemRepo = BhetiyoDataSource.getRepository("Item");
    const { title, category, dateFound, description, location, source, username } = req.body;
    const imageLink = req.uploadedData;
    const groupId = crypto.randomUUID();

    let user = null;
    if (username) {
      const userRepo = BhetiyoDataSource.getRepository("User");
      user = await userRepo.findOne({ where: { name: username } });
    }

    await itemRepo.save({
      group_id: groupId,
      user_id: user?.id ?? null,
      title,
      category,
      dateFound,
      description,
      location,
      source,
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
