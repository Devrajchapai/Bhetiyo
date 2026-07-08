import { BhetiyoDataSource } from "../config/database.js";

const enrichItem = async (imageRepo, item) => {
  const img = await imageRepo.findOne({
    where: { group_id: item.group_id },
    select: ["url"],
  });
  return {
    id: item.group_id,
    title: item.title,
    category: item.category,
    location: item.location,
    image: img?.url || null,
    slug: item.slug || item.group_id,
    source: item.source,
    created_at: item.created_at,
  };
};

export const getProfileData = async (req, res) => {
  try {
    const userId = req.user.id;
    const imageRepo = BhetiyoDataSource.getRepository("Image");
    const itemRepo = BhetiyoDataSource.getRepository("Item");
    const claimRepo = BhetiyoDataSource.getRepository("Claim");
    const conversationRepo = BhetiyoDataSource.getRepository("Conversation");
    const participantRepo = BhetiyoDataSource.getRepository("ConversationParticipant");

    const [uploadedItems, claims, myParticipants] = await Promise.all([
      itemRepo.find({
        where: { user_id: userId },
        order: { created_at: "DESC" },
      }),
      claimRepo.find({
        where: { claimant_id: userId },
        order: { created_at: "DESC" },
      }),
      participantRepo.find({
        where: { user_id: userId },
      }),
    ]);

    const uploaded = await Promise.all(
      uploadedItems.map((item) => enrichItem(imageRepo, item)),
    );

    const claimedGroupIds = [...new Set(claims.map((c) => c.item_group_id))];
    const claimedItems = claimedGroupIds.length
      ? await itemRepo.find({
          where: claimedGroupIds.map((gid) => ({ group_id: gid })),
        })
      : [];

    const claimed = await Promise.all(
      claimedItems.map((item) => enrichItem(imageRepo, item)),
    );

    const conversationIds = myParticipants.map((p) => p.conversation_id);
    const closedConversations = conversationIds.length
      ? await conversationRepo.find({
          where: conversationIds.map((cid) => ({ id: cid, is_closed: true })),
        })
      : [];

    const resolvedGroupIds = [...new Set(closedConversations.map((c) => c.item_group_id))];
    const resolvedItems = resolvedGroupIds.length
      ? await itemRepo.find({
          where: resolvedGroupIds.map((gid) => ({ group_id: gid })),
        })
      : [];

    const resolved = await Promise.all(
      resolvedItems.map((item) => enrichItem(imageRepo, item)),
    );

    res.json({
      data: { uploaded, claimed, resolved },
    });
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    res.status(500).json({ error: "Failed to fetch profile data" });
  }
};
