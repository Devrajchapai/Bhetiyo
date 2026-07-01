import express from "express";
import { authenticate } from "../middleware/auth.js";
import { uploadToCloudinary } from "../middleware/upload.js";
import { storeItem } from "../controllers/itemController.js";

const router = express.Router();

router.post("/upload", authenticate, uploadToCloudinary, storeItem);

export default router;
