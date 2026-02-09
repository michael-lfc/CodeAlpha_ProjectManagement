// // src/api/comment.api.ts
// import { api } from "./axios";
// import type { Comment } from "../types/comment";

// // Add comment
// export const addComment = async (
//   taskId: number,
//   content: string,
//   token: string
// ): Promise<Comment> => {
//   const res = await api.post(
//     "/comments",
//     { taskId, content },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return res.data.data.comment;
// };

// // Get comments for a task
// export const fetchComments = async (taskId: number, token: string): Promise<Comment[]> => {
//   const res = await api.get(`/comments/${taskId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data.data.comments;
// };

import  api  from "./axios";
import type { Comment } from "../types/comment";

// Add comment
export const addComment = async (taskId: number, content: string): Promise<Comment> => {
  const res = await api.post("/comments", { taskId, content });
  return res.data.data.comment;
};

// Get comments for a task
export const fetchComments = async (taskId: number): Promise<Comment[]> => {
  const res = await api.get(`/comments/${taskId}`);
  return res.data.data.comments;
};
