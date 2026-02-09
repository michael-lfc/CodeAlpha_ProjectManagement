import express from "express";
import { protect } from "../auth/auth.middleware.js";
import {
  getMyProfile,
  getUserById,
  updateMyProfile,
  deleteMyAccount,
} from "./users.controller.js";

const router = express.Router();

// Logged-in user
router.get("/me", protect, getMyProfile);
router.put("/update", protect, updateMyProfile);
router.delete("/delete", protect, deleteMyAccount);

// Public / shared
router.get("/:id", protect, getUserById);

export default router;
