import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINAEY_NAME,
  api_key: process.env.CLOUDINAEY_API_KEY,
  api_secret: process.env.CLOUDINAEY_API_SECRET,
});

const uploadConfig = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit per file
});

export const uploadToCloudinary = (req, res, next) => {
  uploadConfig.array("image", 3)(req, res, async (error) => {
    if (error) {
      console.error("Multer Error: ", error);
      if (error instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ error: `Upload limit exceeded: ${error.message}` });
      }
      return res.status(500).json({ error: "File upload failed" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images provided" });
    }

    try {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const fileBase64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

          cloudinary.uploader.upload(
            fileBase64,
            { folder: `Bhetiyo/${req.body.username}` },
            (uploadErr, result) => {
              if (uploadErr) return reject(uploadErr);
              resolve(result.secure_url);
            },
          );
        });
      });
      const uploadedUrls = await Promise.all(uploadPromises);

      // Attach the resulting secure URLs to the request object for the next controller
      req.uploadedImages = uploadedUrls;

      next();
    } catch (cloudError) {
      console.error("Cloudinary Error: ", cloudError);
      return res
        .status(500)
        .json({ error: "Failed to upload images to cloud storage" });
    }
  });
};
