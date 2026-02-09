import { Request, Response } from "express";
import prisma from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

// ================= GET MY PROFILE =================
export const getMyProfile = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({
      status: "success",
      data: {
        user: req.user, // set by protect middleware
      },
    });
  }
);

// ================= GET USER BY ID =================
export const getUserById = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = Number(req.params.id);

    if (!userId || isNaN(userId)) {
      throw new AppError("Invalid user ID", 400);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  }
);

// ================= UPDATE MY ACCOUNT =================
// export const updateMyProfile = asyncHandler(
//   async (req: Request, res: Response) => {
//     const userId = req.user!.id;
//     const { name, email } = req.body;

//     if (!name && !email) {
//       throw new AppError("Nothing to update", 400);
//     }

//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         name,
//         email,
//       },
//     });

//     res.status(200).json({
//       status: "success",
//       data: { user: updatedUser },
//     });
//   }
// );
export const updateMyProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { name, email } = req.body;

    if (!name && !email) {
      throw new AppError("Nothing to update", 400);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name ? { name } : {}),
        ...(email ? { email } : {}),
      },
    });

    res.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  }
);


// ================= DELETE MY ACCOUNT =================
export const deleteMyAccount = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;

    await prisma.user.delete({
      where: { id: userId },
    });

    res.status(200).json({
      status: "success",
      message: "Account deleted successfully",
    });
  }
);
