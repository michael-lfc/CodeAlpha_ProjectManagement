import { Router } from "express";
import { protect } from "../auth/auth.middleware.js";
import {
  createProject,
  getMyProjects,
  addMemberToProject,
  getSingleProject,
  updateProject,
  deleteProject,
} from "./projects.controllers.js";

const router = Router();

router.use(protect);

// POST /api/projects
router.post("/", createProject);

// GET /api/projects/my-projects
router.get("/my-projects", getMyProjects);

// POST /api/projects/:projectId/members
router.post("/:projectId/members", addMemberToProject);

router.get("/:id", getSingleProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
