import express from "express";
import { uploadToCloudinary } from "../middleware/upload.js";
import { storeItem } from "../controllers/itemController.js";

const router = express.Router();

router.post("/upload", uploadToCloudinary, storeItem);

export default router;
