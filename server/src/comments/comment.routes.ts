import { Router } from "express";
import { protect } from "../auth/auth.middleware.js";
import { 
    createComment,
    getTaskComments 
} from "./comment.controller.js";

const router = Router();

router.use(protect);

// POST /api/comments
router.post("/", createComment);

// GET /api/comments/:taskId
router.get("/:taskId", getTaskComments);

export default router;
