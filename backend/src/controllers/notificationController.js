import { BhetiyoDataSource } from "../config/database.js";
import { In } from "typeorm";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notificationRepo = BhetiyoDataSource.getRepository("Notification");
    const itemRepo = BhetiyoDataSource.getRepository("Item");
    const imageRepo = BhetiyoDataSource.getRepository("Image");

    const notifications = await notificationRepo.find({
      where: { user_id: userId },
      order: { created_at: "DESC" },
      take: 50,
    });

    const groupIds = [
      ...new Set(
        notifications.flatMap((n) => [
          n.matched_item_group_id,
          n.source_item_group_id,
        ]),
      ),
    ];

    const items = groupIds.length
      ? await itemRepo.find({
          where: { group_id: In(groupIds) },
          select: ["group_id", "title", "slug", "source"],
        })
      : [];

    const imageMap = {};
    if (groupIds.length) {
      const allImages = await imageRepo.find({
        where: { group_id: In(groupIds) },
        select: ["group_id", "url"],
      });
      for (const img of allImages) {
        if (!imageMap[img.group_id]) {
          imageMap[img.group_id] = img.url;
        }
      }
    }

    const itemMap = {};
    for (const item of items) {
      itemMap[item.group_id] = { ...item, image: imageMap[item.group_id] || null };
    }

    const data = notifications.map((n) => ({
      id: n.id,
      type: n.type,
      title: n.title,
      message: n.message,
      similarity_score: n.similarity_score,
      is_read: n.is_read,
      created_at: n.created_at,
      matched_item: itemMap[n.matched_item_group_id] || null,
      source_item: itemMap[n.source_item_group_id] || null,
    }));

    res.json({ data });
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const notificationRepo = BhetiyoDataSource.getRepository("Notification");

    const notification = await notificationRepo.findOne({ where: { id } });
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    if (notification.user_id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await notificationRepo.update(id, { is_read: true });
    res.json({ message: "Marked as read" });
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const notificationRepo = BhetiyoDataSource.getRepository("Notification");

    await notificationRepo.update(
      { user_id: userId, is_read: false },
      { is_read: true },
    );

    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Failed to mark all notifications as read:", error);
    res.status(500).json({ error: "Failed to mark all notifications as read" });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const notificationRepo = BhetiyoDataSource.getRepository("Notification");

    const count = await notificationRepo.count({
      where: { user_id: userId, is_read: false },
    });

    res.json({ count });
  } catch (error) {
    console.error("Failed to get unread count:", error);
    res.status(500).json({ error: "Failed to get unread count" });
  }
};
