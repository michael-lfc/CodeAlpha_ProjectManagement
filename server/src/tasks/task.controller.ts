import { Request, Response } from "express";
import prisma from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { getIo } from "../websocket/socket.js";

// ================= CREATE TASK =================
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, projectId, assignedToId } = req.body;
  const userId = req.user!.id;

  if (!title || !projectId) throw new AppError("Title and projectId are required", 400);

  // Check current user is a project member
  const project = await prisma.project.findFirst({
    where: { id: Number(projectId), members: { some: { id: userId } } },
  });
  if (!project) throw new AppError("Not authorized for this project", 403);

  // Check assigned user is a project member
  if (assignedToId) {
    const assignee = await prisma.project.findFirst({
      where: { id: Number(projectId), members: { some: { id: Number(assignedToId) } } },
    });
    if (!assignee) throw new AppError("Assigned user is not a project member", 400);
  }

  // Create task
  const task = await prisma.task.create({
    data: {
      title,
      description,
      projectId: Number(projectId),
      assignedToId: assignedToId ? Number(assignedToId) : null,
    },
    include: {
      assignedTo: { select: { id: true, name: true, email: true } },
      comments: true,
    },
  });

  // 🔹 WebSocket notification for assigned user
  if (assignedToId) {
    try {
      const io = getIo();
      io.to(`user_${assignedToId}`).emit("new-notification", {
        message: `You have been assigned a new task: "${task.title}"`,
        taskId: task.id,
      });
    } catch (err) {
      console.log("Socket not initialized yet");
    }
  }

  res.status(201).json({ status: "success", data: { task } });
});

// ================= UPDATE TASK STATUS =================
export const updateTaskStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user!.id;

  const allowedStatuses = ["TODO", "IN_PROGRESS", "DONE"];
  if (!allowedStatuses.includes(status)) throw new AppError("Invalid task status", 400);

  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
    include: { project: { include: { members: true } } },
  });
  if (!task) throw new AppError("Task not found", 404);

  if (!task.project.members.some((m) => m.id === userId))
    throw new AppError("Not authorized", 403);

  const updatedTask = await prisma.task.update({
    where: { id: Number(id) },
    data: { status },
    include: { assignedTo: { select: { id: true, name: true, email: true } } },
  });

  // 🔹 Optionally notify assignee of status change
  if (updatedTask.assignedToId) {
    try {
      const io = getIo();
      io.to(`user_${updatedTask.assignedToId}`).emit("new-notification", {
        message: `Status of task "${updatedTask.title}" changed to ${status}`,
        taskId: updatedTask.id,
      });
    } catch {}
  }

  res.status(200).json({ status: "success", data: { task: updatedTask } });
});

// ================= GET TASKS BY PROJECT =================
export const getTasksByProject = asyncHandler(async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const userId = req.user!.id;

  const project = await prisma.project.findUnique({
    where: { id: Number(projectId) },
    include: { members: true },
  });
  if (!project) throw new AppError("Project not found", 404);
  if (!project.members.some((m) => m.id === userId))
    throw new AppError("Not authorized", 403);

  const tasks = await prisma.task.findMany({
    where: { projectId: Number(projectId) },
    include: {
      assignedTo: { select: { id: true, name: true, email: true } },
      comments: true,
    },
    orderBy: { updatedAt: "desc" }, // show latest updated first
  });

  res.status(200).json({ status: "success", results: tasks.length, data: { tasks } });
});
