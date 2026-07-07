import express from "express";
import { authenticate } from "../middleware/auth.js";
import { uploadToCloudinary } from "../middleware/upload.js";
import { getItems, getItemByGroup, getItemBySlug, storeItem } from "../controllers/itemController.js";

const router = express.Router();

router.get("/items", getItems);
router.get("/items/:group_id", getItemByGroup);
router.get("/slug/:slug", getItemBySlug);
router.post("/upload", authenticate, uploadToCloudinary, storeItem);

export default router;
