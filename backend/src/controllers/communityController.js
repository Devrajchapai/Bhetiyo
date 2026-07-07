import { MoreThanOrEqual } from "typeorm";
import { BhetiyoDataSource } from "../config/database.js";

export const getCommunityData = async (req, res) => {
  try {
    const userRepo = BhetiyoDataSource.getRepository("User");
    const itemRepo = BhetiyoDataSource.getRepository("Item");
    const conversationRepo = BhetiyoDataSource.getRepository("Conversation");

    const totalUsers = await userRepo.count();

    const totalItems = await itemRepo.count();

    const closedConversations = await conversationRepo.count({
      where: { is_closed: true },
    });

    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonthClosed = await conversationRepo.count({
      where: { is_closed: true, closed_at: MoreThanOrEqual(firstOfMonth) },
    });

    const returnRate = totalItems > 0
      ? Math.round((closedConversations / totalItems) * 100)
      : 0;

    const allItemIds = await itemRepo.find({ select: ["user_id"] });
    const userIds = [...new Set(allItemIds.map((i) => i.user_id).filter(Boolean))];

    const users = userIds.length
      ? await userRepo.find({ where: userIds.map((id) => ({ id })), select: ["id", "name"] })
      : [];

    const nameMap = new Map(users.map((u) => [u.id, u.name]));

    const counts = new Map();
    for (const item of allItemIds) {
      if (!item.user_id) continue;
      counts.set(item.user_id, (counts.get(item.user_id) || 0) + 1);
    }

    const topContributors = Array.from(counts.entries())
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

    const closedConversationItems = await conversationRepo.find({
      where: { is_closed: true },
      order: { closed_at: "DESC" },
      take: 10,
    });

    const successStories = [];
    for (const conv of closedConversationItems) {
      const item = await itemRepo.findOne({
        where: { group_id: conv.item_group_id },
      });
      if (item) {
        successStories.push({
          title: item.title,
          description: item.description || "Successfully returned to its owner.",
          location: item.location || "Unknown",
          returned_at: conv.closed_at,
        });
      }
    }

    const emojis = ["🎉", "✨", "💫", "🌟", "👏", "🤝", "💙", "🙌", "🎊", "⭐"];

    res.json({
      data: {
        stats: [
          {
            icon: "RotateCcw",
            value: `${closedConversations}+`,
            label: "Items Reunited",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            icon: "Users",
            value: `${totalUsers}+`,
            label: "Active Members",
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            icon: "HandHeart",
            value: `${returnRate}%`,
            label: "Return Rate",
            color: "text-violet-600",
            bg: "bg-violet-50",
          },
          {
            icon: "TrendingUp",
            value: `${thisMonthClosed}+`,
            label: "This Month",
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
        ],
        topContributors: topContributors.slice(0, 6),
        successStories: successStories.slice(0, 6).map((s, i) => ({
          ...s,
          emoji: emojis[i % emojis.length],
        })),
      },
    });
  } catch (error) {
    console.error("Failed to fetch community data:", error);
    res.status(500).json({ error: "Failed to fetch community data" });
  }
};
