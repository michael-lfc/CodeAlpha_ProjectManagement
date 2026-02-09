import { Router } from "express";
import { protect } from "../auth/auth.middleware.js";
import {
  getMyNotifications,
  markAsRead,
} from "./notification.controller.js";

const router = Router();

router.use(protect);

// GET /api/notifications
router.get("/", getMyNotifications);

// PATCH /api/notifications/:id/read
router.patch("/:id/read", markAsRead);

export default router;
