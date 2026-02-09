import { Request, Response } from "express";
import prisma from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

// ================= CREATE COMMENT =================
export const createComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { taskId, content } = req.body;
    const userId = req.user!.id; // current logged-in user

    if (!taskId || !content) {
      throw new AppError("taskId and content are required", 400);
    }

    // Fetch task and project members
    const task = await prisma.task.findUnique({
      where: { id: Number(taskId) },
      include: { project: { include: { members: true } } },
    });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    // Check if user is a member of the project
    const isMember = task.project.members.some((m) => m.id === userId);
    if (!isMember) {
      throw new AppError("Not authorized to comment", 403);
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content,
        taskId: task.id,
        userId,
      },
    });

    // Notify task assignee (if exists and is not the commenter)
    if (task.assignedToId && task.assignedToId !== userId) {
      const notification = await prisma.notification.create({
        data: {
          userId: task.assignedToId,
          message: `New comment on task: "${task.title}"`,
          // message: `${req.user!.name} commented on task: "${task.title}"`,
          type: "COMMENT",
          link: `/tasks/${task.id}`,
          relatedId: task.id,
        },
      });

      // Emit via WebSocket if available
      req.io?.to(`user_${task.assignedToId}`).emit("new-notification", notification);
    }

    res.status(201).json({
      status: "success",
      data: { comment },
    });
  }
);

// ================= GET TASK COMMENTS =================
export const getTaskComments = asyncHandler(
  async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const userId = req.user!.id;

    // Fetch task and project members
    const task = await prisma.task.findUnique({
      where: { id: Number(taskId) },
      include: { project: { include: { members: true } } },
    });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    // Only project members can view comments
    const isMember = task.project.members.some((m) => m.id === userId);
    if (!isMember) {
      throw new AppError("Not authorized to view comments", 403);
    }

    const comments = await prisma.comment.findMany({
      where: { taskId: Number(taskId) },
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json({
      status: "success",
      results: comments.length,
      data: { comments },
    });
  }
);