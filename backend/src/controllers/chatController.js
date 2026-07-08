import { In } from "typeorm";
import { BhetiyoDataSource } from "../config/database.js";

export const claimItem = async (req, res) => {
  try {
    const { item_group_id, type } = req.body;
    const userId = req.user.id;

    if (!item_group_id || !type) {
      return res.status(400).json({ error: "item_group_id and type are required" });
    }

    if (!["private", "group"].includes(type)) {
      return res.status(400).json({ error: "type must be 'private' or 'group'" });
    }

    const itemRepo = BhetiyoDataSource.getRepository("Item");
    const claimRepo = BhetiyoDataSource.getRepository("Claim");
    const conversationRepo = BhetiyoDataSource.getRepository("Conversation");
    const participantRepo = BhetiyoDataSource.getRepository("ConversationParticipant");

    const item = await itemRepo.findOne({ where: { group_id: item_group_id } });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (item.user_id === userId) {
      return res.status(400).json({ error: "You cannot claim your own item" });
    }

    const existingClaim = await claimRepo.findOne({
      where: { item_group_id, claimant_id: userId, type },
    });
    if (existingClaim) {
      return res.status(400).json({ error: "You have already claimed this item" });
    }

    await claimRepo.save({
      item_group_id,
      claimant_id: userId,
      type,
    });

    let conversation;
    if (type === "private") {
      conversation = await conversationRepo.save({
        item_group_id,
        type: "private",
        is_closed: false,
      });

      await participantRepo.save({ conversation_id: conversation.id, user_id: userId });
      await participantRepo.save({ conversation_id: conversation.id, user_id: item.user_id });
    } else {
      let existingConv = await conversationRepo.findOne({
        where: { item_group_id, type: "group", is_closed: false },
      });

      if (existingConv) {
        conversation = existingConv;
      } else {
        conversation = await conversationRepo.save({
          item_group_id,
          type: "group",
          is_closed: false,
        });

        await participantRepo.save({ conversation_id: conversation.id, user_id: item.user_id });
      }

      const alreadyParticipant = await participantRepo.findOne({
        where: { conversation_id: conversation.id, user_id: userId },
      });
      if (!alreadyParticipant) {
        await participantRepo.save({ conversation_id: conversation.id, user_id: userId });
      }
    }

    const participants = await participantRepo.find({
      where: { conversation_id: conversation.id },
    });

    const userRepo = BhetiyoDataSource.getRepository("User");
    const participantUsers = await Promise.all(
      participants.map((p) =>
        userRepo.findOne({ where: { id: p.user_id }, select: ["id", "name", "email"] }),
      ),
    );

    res.status(201).json({
      message: "Item claimed successfully",
      data: {
        conversation: {
          ...conversation,
          participants: participantUsers.filter(Boolean),
          is_uploader: false,
        },
      },
    });
  } catch (error) {
    console.error("Failed to claim item:", error);
    res.status(500).json({ error: "Failed to claim item" });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const participantRepo = BhetiyoDataSource.getRepository("ConversationParticipant");
    const conversationRepo = BhetiyoDataSource.getRepository("Conversation");
    const messageRepo = BhetiyoDataSource.getRepository("Message");
    const itemRepo = BhetiyoDataSource.getRepository("Item");
    const userRepo = BhetiyoDataSource.getRepository("User");

    const memberships = await participantRepo.find({
      where: { user_id: userId },
    });

    if (!memberships.length) {
      return res.json({ data: [] });
    }

    const conversationIds = memberships.map((m) => m.conversation_id);
    const conversations = await conversationRepo.find({
      where: { id: In(conversationIds) },
    });

    const conversationsWithMeta = await Promise.all(
      conversations.map(async (conv) => {
        const participants = await participantRepo.find({
          where: { conversation_id: conv.id },
        });

        const participantUsers = await Promise.all(
          participants.map((p) =>
            userRepo.findOne({ where: { id: p.user_id }, select: ["id", "name", "email"] }),
          ),
        );

        const lastMessage = await messageRepo.findOne({
          where: { conversation_id: conv.id },
          order: { created_at: "DESC" },
        });

        const item = await itemRepo.findOne({
          where: { group_id: conv.item_group_id },
          select: ["title", "group_id", "source", "slug", "user_id"],
        });

        const is_uploader = item ? item.user_id === userId : false;

        return {
          ...conv,
          item: item || null,
          participants: participantUsers.filter(Boolean),
          lastMessage: lastMessage || null,
          is_uploader,
        };
      }),
    );

    conversationsWithMeta.sort((a, b) => {
      const aTime = a.lastMessage
        ? new Date(a.lastMessage.created_at).getTime()
        : new Date(a.created_at).getTime();
      const bTime = b.lastMessage
        ? new Date(b.lastMessage.created_at).getTime()
        : new Date(b.created_at).getTime();
      return bTime - aTime;
    });

    res.json({ data: conversationsWithMeta });
  } catch (error) {
    console.error("Failed to fetch conversations:", error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const participantRepo = BhetiyoDataSource.getRepository("ConversationParticipant");
    const messageRepo = BhetiyoDataSource.getRepository("Message");
    const userRepo = BhetiyoDataSource.getRepository("User");

    const isParticipant = await participantRepo.findOne({
      where: { conversation_id: id, user_id: userId },
    });
    if (!isParticipant) {
      return res.status(403).json({ error: "Not a participant of this conversation" });
    }

    const messages = await messageRepo.find({
      where: { conversation_id: id },
      order: { created_at: "ASC" },
    });

    const messagesWithSender = await Promise.all(
      messages.map(async (msg) => {
        const sender = await userRepo.findOne({
          where: { id: msg.sender_id },
          select: ["id", "name", "email"],
        });
        return {
          id: msg.id,
          conversation_id: msg.conversation_id,
          sender_id: msg.sender_id,
          content: msg.content,
          created_at: msg.created_at instanceof Date
            ? msg.created_at.toISOString()
            : new Date(msg.created_at).toISOString(),
          sender,
        };
      }),
    );

    res.json({ data: messagesWithSender });
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Message content is required" });
    }

    const conversationRepo = BhetiyoDataSource.getRepository("Conversation");
    const participantRepo = BhetiyoDataSource.getRepository("ConversationParticipant");
    const messageRepo = BhetiyoDataSource.getRepository("Message");
    const userRepo = BhetiyoDataSource.getRepository("User");

    const conversation = await conversationRepo.findOne({ where: { id } });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    if (conversation.is_closed) {
      return res.status(400).json({ error: "Conversation is closed" });
    }

    const isParticipant = await participantRepo.findOne({
      where: { conversation_id: id, user_id: userId },
    });
    if (!isParticipant) {
      return res.status(403).json({ error: "Not a participant of this conversation" });
    }

    const now = new Date();
    const message = await messageRepo.save({
      conversation_id: parseInt(id),
      sender_id: userId,
      content: content.trim(),
      created_at: now,
    });

    const sender = await userRepo.findOne({
      where: { id: userId },
      select: ["id", "name", "email"],
    });

    const messageData = {
      id: message.id,
      conversation_id: message.conversation_id,
      sender_id: message.sender_id,
      content: message.content,
      created_at: now.toISOString(),
      sender,
    };

    try {
      const io = req.app.get("io");
      if (io) {
        io.to(`conversation:${id}`).emit("message:new", messageData);
      }
    } catch (e) {
      console.error("Socket emit error:", e);
    }

    res.status(201).json({ data: messageData });
  } catch (error) {
    console.error("Failed to send message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const closeConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const conversationRepo = BhetiyoDataSource.getRepository("Conversation");
    const itemRepo = BhetiyoDataSource.getRepository("Item");
    const participantRepo = BhetiyoDataSource.getRepository("ConversationParticipant");
    const notificationRepo = BhetiyoDataSource.getRepository("Notification");

    const conversation = await conversationRepo.findOne({ where: { id } });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const item = await itemRepo.findOne({ where: { group_id: conversation.item_group_id } });
    if (!item || item.user_id !== userId) {
      return res.status(403).json({ error: "Only the item uploader can close this conversation" });
    }

    await conversationRepo.update(id, {
      is_closed: true,
      closed_at: new Date(),
    });

    const participants = await participantRepo.find({
      where: { conversation_id: id },
    });

    const io = req.app.get("io");

    for (const participant of participants) {
      if (participant.user_id === userId) continue;

      const notif = await notificationRepo.save({
        type: "conversation_closed",
        similarity_score: null,
        source_item_group_id: conversation.item_group_id,
        matched_item_group_id: conversation.item_group_id,
        user_id: participant.user_id,
        title: "Conversation closed",
        message: `The conversation about "${item.title}" has been closed by the uploader.`,
        is_read: false,
      });

      if (io) {
        io.to(`user:${participant.user_id}`).emit("notification:new", {
          id: notif.id,
          type: notif.type,
          title: notif.title,
          message: notif.message,
          matched_item_group_id: conversation.item_group_id,
          similarity_score: null,
          created_at: notif.created_at instanceof Date
            ? notif.created_at.toISOString()
            : new Date(notif.created_at).toISOString(),
        });
      }
    }

    try {
      if (io) {
        io.to(`conversation:${id}`).emit("conversation:closed", {
          conversation_id: id,
        });
      }
    } catch (e) {
      console.error("Socket emit error:", e);
    }

    res.json({ message: "Conversation closed" });
  } catch (error) {
    console.error("Failed to close conversation:", error);
    res.status(500).json({ error: "Failed to close conversation" });
  }
};

export const startPrivateConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id: targetUserId } = req.body;
    const userId = req.user.id;
    const conversationRepo = BhetiyoDataSource.getRepository("Conversation");
    const participantRepo = BhetiyoDataSource.getRepository("ConversationParticipant");
    const itemRepo = BhetiyoDataSource.getRepository("Item");
    const userRepo = BhetiyoDataSource.getRepository("User");

    const conversation = await conversationRepo.findOne({ where: { id } });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const item = await itemRepo.findOne({ where: { group_id: conversation.item_group_id } });
    if (!item || item.user_id !== userId) {
      return res.status(403).json({ error: "Only the item uploader can start private conversations" });
    }

    if (conversation.type !== "group") {
      return res.status(400).json({ error: "Can only start private conversations from group conversations" });
    }

    const existingPrivate = await conversationRepo.findOne({
      where: { item_group_id: conversation.item_group_id, type: "private", is_closed: false },
    });

    if (existingPrivate) {
      const alreadyParticipant = await participantRepo.findOne({
        where: { conversation_id: existingPrivate.id, user_id: targetUserId },
      });
      if (alreadyParticipant) {
        const participants = await participantRepo.find({
          where: { conversation_id: existingPrivate.id },
        });
        const participantUsers = await Promise.all(
          participants.map((p) =>
            userRepo.findOne({ where: { id: p.user_id }, select: ["id", "name", "email"] }),
          ),
        );

        return res.json({
          data: { ...existingPrivate, participants: participantUsers.filter(Boolean) },
        });
      }
    }

    const newConv = await conversationRepo.save({
      item_group_id: conversation.item_group_id,
      type: "private",
      is_closed: false,
    });

    await participantRepo.save({ conversation_id: newConv.id, user_id: userId });
    await participantRepo.save({ conversation_id: newConv.id, user_id: targetUserId });

    const participants = await participantRepo.find({
      where: { conversation_id: newConv.id },
    });
    const participantUsers = await Promise.all(
      participants.map((p) =>
        userRepo.findOne({ where: { id: p.user_id }, select: ["id", "name", "email"] }),
      ),
    );

    res.status(201).json({
      data: { ...newConv, participants: participantUsers.filter(Boolean), is_uploader: true },
    });
  } catch (error) {
    console.error("Failed to start private conversation:", error);
    res.status(500).json({ error: "Failed to start private conversation" });
  }
};
