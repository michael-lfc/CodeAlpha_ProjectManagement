import api from "./api";
import type { Comment } from "../types/comment";

// Fetch comments for a task
export const getCommentsByTask = async (taskId: number): Promise<Comment[]> => {
  const res = await api.get(`/comments/${taskId}`);
  return res.data.data.comments;
};

// Create a new comment
export const createComment = async (taskId: number, content: string): Promise<Comment> => {
  const res = await api.post("/comments", { taskId, content });
  return res.data.data.comment;
};
