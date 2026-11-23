import { createContext, useContext, useState, type ReactNode } from "react";
import type { Comment } from "../types/comment";
import * as commentApi from "../services/comment.api";

interface CommentContextType {
  comments: Comment[];
  fetchComments: (taskId: number) => Promise<void>;
  addComment: (taskId: number, content: string) => Promise<void>;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async (taskId: number) => {
    const data = await commentApi.getCommentsByTask(taskId);
    setComments(data);
  };

  const addComment = async (taskId: number, content: string) => {
    const newComment = await commentApi.createComment(taskId, content);
    setComments((prev) => [...prev, newComment]);
  };

  return (
    <CommentContext.Provider value={{ comments, fetchComments, addComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) throw new Error("useComments must be used within a CommentProvider");
  return context;
};
