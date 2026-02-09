import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { protect } from "./auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
