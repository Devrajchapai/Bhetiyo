import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
} from "../controllers/notificationController.js";

const router = Router();

router.get("/notifications", authenticate, getNotifications);
router.put("/notifications/:id/read", authenticate, markAsRead);
router.put("/notifications/read-all", authenticate, markAllAsRead);
router.get("/notifications/unread-count", authenticate, getUnreadCount);

export default router;
