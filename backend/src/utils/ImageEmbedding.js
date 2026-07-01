import {
  AutoProcessor,
  CLIPVisionModelWithProjection,
  RawImage,
} from "@xenova/transformers";

let processorInstance = null;
let modelInstance = null;

const ImageEmbedding = async (imageBuffer, mimeType = "image/jpeg") => {
  try {
    // 1. Initialize and cache model instances
    if (!processorInstance || !modelInstance) {
      const modelId = "Xenova/clip-vit-base-patch32";
      processorInstance = await AutoProcessor.from_pretrained(modelId);
      modelInstance =
        await CLIPVisionModelWithProjection.from_pretrained(modelId);
    }

    // 2. Read from buffer via Blob
    const blob = new Blob([imageBuffer], { type: mimeType });
    const rawImage = await RawImage.fromBlob(blob);

    // 3. Preprocess the raw image object
    const imageInputs = await processorInstance(rawImage);

    // 4. Generate the image vectors
    const { image_embeds } = await modelInstance(imageInputs);

    // 5. Return raw float32 buffer (512 dims × 4 bytes = 2048 bytes)
    const float32Array = image_embeds.data;
    return Buffer.from(float32Array.buffer);
  } catch (error) {
    console.error("Failed to get image vector value:", error);
    throw error;
  }
};

export default ImageEmbedding;
