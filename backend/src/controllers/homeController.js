import { v2 as cloudinary } from "cloudinary";
import { BhetiyoDataSource } from "../config/database.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINAEY_NAME,
  api_key: process.env.CLOUDINAEY_API_KEY,
  api_secret: process.env.CLOUDINAEY_API_SECRET,
});

const buildContributors = async (itemRepo, userRepo) => {
  const allItems = await itemRepo.find({ select: ["user_id"] });
  const userIds = [...new Set(allItems.map((i) => i.user_id).filter(Boolean))];

  const users = userIds.length
    ? await userRepo.find({ where: userIds.map((id) => ({ id })), select: ["id", "name"] })
    : [];

  const nameMap = new Map(users.map((u) => [u.id, u.name]));

  const counts = new Map();
  for (const item of allItems) {
    if (!item.user_id) continue;
    counts.set(item.user_id, (counts.get(item.user_id) || 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([userId, items], idx) => {
      const name = nameMap.get(userId) || `User ${userId}`;
      let badge = "Rising";
      if (idx === 0) badge = "Gold";
      else if (idx === 1) badge = "Silver";
      else if (idx === 2) badge = "Bronze";
      return {
        user_id: userId,
        name,
        items,
        badge,
        avatar: name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
      };
    });
};

const enrichItems = async (imageRepo, conversationRepo, items) => {
  const closedConversations = await conversationRepo.find({
    where: { is_closed: true },
    select: ["item_group_id"],
  });
  const resolvedGroupIds = new Set(closedConversations.map((c) => c.item_group_id));

  return Promise.all(
    items.map(async (item) => {
      const img = await imageRepo.findOne({
        where: { group_id: item.group_id },
        select: ["url"],
      });
      return {
        id: item.group_id,
        type: item.source.toUpperCase(),
        category: item.category,
        title: item.title,
        location: item.location,
        image: img?.url || null,
        slug: item.slug || item.group_id,
        buttonText: item.source.toLowerCase() === "found" ? "That's mine!" : "Found this?",
        resolved: resolvedGroupIds.has(item.group_id),
      };
    }),
  );
};

export const getHomeData = async (req, res) => {
  try {
    const imageRepo = BhetiyoDataSource.getRepository("Image");
    const itemRepo = BhetiyoDataSource.getRepository("Item");
    const userRepo = BhetiyoDataSource.getRepository("User");
    const conversationRepo = BhetiyoDataSource.getRepository("Conversation");

    const [homepageImages, allItems, totalUsers, closedConversations, totalItems] = await Promise.all([
      cloudinary.api.resources({
        type: "upload",
        prefix: "Home/Bhetiyo/Homepage",
        max_results: 20,
      }),
      itemRepo.find({
        order: { created_at: "DESC" },
      }),
      userRepo.count(),
      conversationRepo.count({ where: { is_closed: true } }),
      itemRepo.count(),
    ]);

    const imageUrls = homepageImages?.resources?.map((r) => r.secure_url) || [];

    const recentItems = await enrichItems(imageRepo, conversationRepo, allItems.slice(0, 20));
    const topContributors = await buildContributors(itemRepo, userRepo);

    const returnRate = totalItems > 0
      ? Math.round((closedConversations / totalItems) * 100)
      : 0;

    res.json({
      data: {
        heroImages: imageUrls,
        items: recentItems.slice(0, 16),
        topContributors,
        stats: {
          reunited: `${closedConversations}+`,
          members: `${totalUsers}+`,
          returnRate: `${returnRate}%`,
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch home data:", error);
    res.status(500).json({ error: "Failed to fetch home data" });
  }
};
