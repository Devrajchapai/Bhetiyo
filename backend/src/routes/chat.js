import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  claimItem,
  getConversations,
  getMessages,
  sendMessage,
  closeConversation,
  startPrivateConversation,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/claim", authenticate, claimItem);
router.get("/conversations", authenticate, getConversations);
router.get("/conversations/:id/messages", authenticate, getMessages);
router.post("/conversations/:id/messages", authenticate, sendMessage);
router.post("/conversations/:id/close", authenticate, closeConversation);
router.post("/conversations/:id/private", authenticate, startPrivateConversation);

export default router;
