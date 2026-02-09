import { Router } from "express";
import { protect } from "../auth/auth.middleware.js";
import {
  createTask,
  updateTaskStatus,
  getTasksByProject
} from "./task.controller.js";

const router = Router();

// all task routes are protected
router.use(protect);

// POST /api/tasks
router.post("/", createTask);

// GET /api/tasks/project/:projectId
router.get("/project/:projectId", getTasksByProject);

// PATCH /api/tasks/:id/status
router.patch("/:id/status", updateTaskStatus);

export default router;
