import { Request, Response } from "express";
import prisma from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

// ================= GET MY NOTIFICATIONS =================
export const getMyNotifications = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id; // get current user ID
    console.log("Current user ID:", userId);

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      status: "success",
      results: notifications.length,
      data: { notifications },
    });
  }
);


export const markAsRead = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params; // ✅ FIX HERE

    const notificationId = Number(id);
    if (isNaN(notificationId)) {
      throw new AppError("Invalid notification ID", 400);
    }

    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new AppError("Notification not found", 404);
    }

    if (notification.userId !== userId) {
      throw new AppError("Not authorized", 403);
    }

    const updatedNotification = await prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });

    res.status(200).json({
      status: "success",
      data: { notification: updatedNotification },
    });
  }
);
