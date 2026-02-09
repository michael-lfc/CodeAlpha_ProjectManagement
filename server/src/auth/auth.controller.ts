import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/generateToken.js";
import { AppError } from "../utils/AppError.js";

// ================= REGISTER =================
export const register = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(user.id);

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  }
);

// // ================= LOGIN =================
// export const login = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       throw new AppError("Email and password are required", 400);
//     }

//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       throw new AppError("Invalid credentials", 401);
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       throw new AppError("Invalid credentials", 401);
//     }

//     const token = generateToken(user.id);

//     res.status(200).json({
//       status: "success",
//       data: {
//         user: {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         },
//         token,
//       },
//     });
//   }
// );

export const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("Login body:", req.body);
    console.log("JWT secret:", process.env.JWT_SECRET);

    if (!email || !password) throw new AppError("Email and password required", 400);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError("Invalid credentials", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError("Invalid credentials", 401);

    const token = generateToken(user.id);

    res.status(200).json({
      status: "success",
      data: {
        user: { id: user.id, name: user.name, email: user.email },
        token,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    throw err; // Let asyncHandler still handle it
  }
});
