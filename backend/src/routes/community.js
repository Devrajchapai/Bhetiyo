import express from "express";
import { getCommunityData } from "../controllers/communityController.js";

const router = express.Router();

router.get("/", getCommunityData);

export default router;
