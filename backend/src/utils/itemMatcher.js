import { BhetiyoDataSource } from "../config/database.js";

const IMAGE_SIMILARITY_WEIGHT = 0.6;
const TEXT_SIMILARITY_WEIGHT = 0.4;
const MATCH_THRESHOLD = 0.7;

const cosineSimilarity = (vecA, vecB) => {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dotProduct / denom;
};

const bufferToFloat32Array = (buffer) => {
  if (!buffer) return null;
  const byteLen = buffer.length || buffer.byteLength;
  if (!byteLen || byteLen < 4) return null;
  const floatCount = byteLen / 4;
  if (!Number.isInteger(floatCount)) return null;
  const arr = new Float32Array(floatCount);
  if (typeof buffer.readFloatLE === "function") {
    for (let i = 0; i < floatCount; i++) {
      arr[i] = buffer.readFloatLE(i * 4);
    }
  } else {
    const view = new DataView(
      buffer.buffer || buffer,
      buffer.byteOffset || 0,
      byteLen,
    );
    for (let i = 0; i < floatCount; i++) {
      arr[i] = view.getFloat32(i * 4, true);
    }
  }
  return arr;
};

const tokenize = (text) => {
  if (!text) return new Set();
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter(Boolean),
  );
};

const jaccardSimilarity = (setA, setB) => {
  if (setA.size === 0 && setB.size === 0) return 0;
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
};

const computeImageSimilarity = (newImageVectors, existingImageVectors) => {
  let maxSim = 0;
  for (const newVec of newImageVectors) {
    if (!newVec) continue;
    for (const existingVec of existingImageVectors) {
      if (!existingVec) continue;
      const sim = cosineSimilarity(newVec, existingVec);
      if (sim > maxSim) maxSim = sim;
    }
  }
  return maxSim;
};

export const findMatchesForItem = async (itemGroupId, io) => {
  try {
    const itemRepo = BhetiyoDataSource.getRepository("Item");
    const imageRepo = BhetiyoDataSource.getRepository("Image");
    const notificationRepo = BhetiyoDataSource.getRepository("Notification");

    const newItem = await itemRepo.findOne({ where: { group_id: itemGroupId } });
    if (!newItem) return;

    const oppositeSource = newItem.source === "lost" ? "found" : "lost";

    const candidateItems = await itemRepo.find({
      where: { source: oppositeSource },
    });

    if (!candidateItems.length) return;

    const newImages = await imageRepo.find({
      where: { group_id: itemGroupId },
    });

    const newImageVectors = newImages.map((img) =>
      bufferToFloat32Array(img.vector_value),
    );

    const newTokens = tokenize(`${newItem.title} ${newItem.description || ""}`);

    for (const candidate of candidateItems) {
      if (candidate.user_id === newItem.user_id) continue;

      const candidateImages = await imageRepo.find({
        where: { group_id: candidate.group_id },
      });

      if (!candidateImages.length) continue;

      const candidateImageVectors = candidateImages.map((img) =>
        bufferToFloat32Array(img.vector_value),
      );

      const imageSim = computeImageSimilarity(newImageVectors, candidateImageVectors);
      const candidateTokens = tokenize(
        `${candidate.title} ${candidate.description || ""}`,
      );
      const textSim = jaccardSimilarity(newTokens, candidateTokens);

      const combinedScore = IMAGE_SIMILARITY_WEIGHT * imageSim + TEXT_SIMILARITY_WEIGHT * textSim;

      if (combinedScore >= MATCH_THRESHOLD) {
        const scoreRounded = Math.round(combinedScore * 100);

        const existingNotification = await notificationRepo.findOne({
          where: {
            source_item_group_id: itemGroupId,
            matched_item_group_id: candidate.group_id,
          },
        });
        if (existingNotification) continue;

        const uploaderNotif = await notificationRepo.save({
          type: "match_found",
          similarity_score: scoreRounded,
          source_item_group_id: itemGroupId,
          matched_item_group_id: candidate.group_id,
          user_id: newItem.user_id,
          title: "Possible match found!",
          message: `Your ${newItem.source} item "${newItem.title}" closely matches a ${oppositeSource} item "${candidate.title}" (${scoreRounded}% match).`,
          is_read: false,
        });

        if (io) {
          io.to(`user:${newItem.user_id}`).emit("notification:new", {
            id: uploaderNotif.id,
            type: uploaderNotif.type,
            title: uploaderNotif.title,
            message: uploaderNotif.message,
            matched_item_group_id: candidate.group_id,
            similarity_score: scoreRounded,
            created_at: uploaderNotif.created_at instanceof Date
              ? uploaderNotif.created_at.toISOString()
              : new Date(uploaderNotif.created_at).toISOString(),
          });
        }

        if (candidate.user_id) {
          const otherNotif = await notificationRepo.save({
            type: "match_found",
            similarity_score: scoreRounded,
            source_item_group_id: candidate.group_id,
            matched_item_group_id: itemGroupId,
            user_id: candidate.user_id,
            title: "Your item might be a match!",
            message: `A ${newItem.source} item "${newItem.title}" closely matches your ${oppositeSource} item "${candidate.title}" (${scoreRounded}% match).`,
            is_read: false,
          });

          if (io) {
            io.to(`user:${candidate.user_id}`).emit("notification:new", {
              id: otherNotif.id,
              type: otherNotif.type,
              title: otherNotif.title,
              message: otherNotif.message,
              matched_item_group_id: itemGroupId,
              similarity_score: scoreRounded,
              created_at: otherNotif.created_at instanceof Date
                ? otherNotif.created_at.toISOString()
                : new Date(otherNotif.created_at).toISOString(),
            });
          }
        }
      }
    }
  } catch (error) {
    console.error("Item matching error:", error);
  }
};
