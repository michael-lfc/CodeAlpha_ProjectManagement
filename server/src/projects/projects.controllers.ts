import { Request, Response } from "express";
import prisma from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { getIo } from "../websocket/socket.js";

// ----------------- HELPER -----------------
const getAuthUserId = (req: Request): number => {
  if (!req.user) throw new AppError("Not authenticated", 401);
  return req.user.id;
};

// ================= CREATE PROJECT =================
export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const { name, description } = req.body;

  if (!name) throw new AppError("Project name is required", 400);

  const project = await prisma.project.create({
    data: {
      name,
      description,
      ownerId: userId,
      members: { connect: { id: userId } }, // owner is also a member
    },
    include: { members: true },
  });

  res.status(201).json({
    status: "success",
    data: { project },
  });
});

// ================= GET MY PROJECTS =================
export const getMyProjects = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthUserId(req);

  const projects = await prisma.project.findMany({
    where: { members: { some: { id: userId } } },
    include: {
      owner: { select: { id: true, name: true, email: true } },
      members: { select: { id: true, name: true, email: true } },
      tasks: { include: { assignedTo: true } },
    },
  });

  res.status(200).json({
    status: "success",
    results: projects.length,
    data: { projects },
  });
});

// ================= GET SINGLE PROJECT =================
export const getSingleProject = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const projectId = Number(req.params.id);

  if (!projectId || isNaN(projectId)) throw new AppError("Invalid project ID", 400);

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      owner: { select: { id: true, name: true, email: true } },
      members: { select: { id: true, name: true, email: true } },
      tasks: { include: { assignedTo: true, comments: true } },
    },
  });

  if (!project) throw new AppError("Project not found", 404);

  if (!project.members.some((m) => m.id === userId))
    throw new AppError("Not authorized", 403);

  res.status(200).json({ status: "success", data: { project } });
});

// ================= UPDATE PROJECT =================
export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const projectId = Number(req.params.id);
  const { name, description } = req.body;

  if (!projectId || isNaN(projectId)) throw new AppError("Invalid project ID", 400);

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) throw new AppError("Project not found", 404);
  if (project.ownerId !== userId) throw new AppError("Not authorized", 403);

  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: {
      ...(name && { name }),
      ...(description && { description }),
    },
    include: { members: true },
  });

  res.status(200).json({ status: "success", data: { project: updatedProject } });
});

// ================= DELETE PROJECT =================
export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const projectId = Number(req.params.id);

  if (!projectId || isNaN(projectId)) throw new AppError("Invalid project ID", 400);

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) throw new AppError("Project not found", 404);
  if (project.ownerId !== userId) throw new AppError("Not authorized", 403);

  await prisma.project.delete({ where: { id: projectId } });

  res.status(200).json({ status: "success", message: "Project deleted" });
});

// ================= ADD MEMBER TO PROJECT =================
export const addMemberToProject = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const projectId = Number(req.params.id || req.params.projectId);
  const newMemberId = Number(req.body.userId);

  if (!projectId || isNaN(projectId)) throw new AppError("Invalid project ID", 400);
  if (!newMemberId || isNaN(newMemberId)) throw new AppError("Invalid user ID", 400);

  const project = await prisma.project.findUnique({ where: { id: projectId }, include: { members: true } });
  if (!project) throw new AppError("Project not found", 404);
  if (project.ownerId !== userId) throw new AppError("Not authorized", 403);

  const userToAdd = await prisma.user.findUnique({ where: { id: newMemberId } });
  if (!userToAdd) throw new AppError("User not found", 404);

  if (project.members.some((m) => m.id === newMemberId))
    throw new AppError("User already a project member", 409);

  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: { members: { connect: { id: newMemberId } } },
    include: { members: true },
  });

  // 🔹 WebSocket notifications
  try {
    const io = getIo();
    io.to(`user_${newMemberId}`).emit("new-notification", {
      message: `You were added to project "${project.name}"`,
      projectId,
    });
  } catch (err) {
    console.log("Socket not initialized yet");
  }

  res.status(200).json({
    status: "success",
    message: "User added to project",
    data: { project: updatedProject },
  });
});

