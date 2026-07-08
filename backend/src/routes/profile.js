import express from "express";
import { getProfileData } from "../controllers/profileController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, getProfileData);

export default router;
