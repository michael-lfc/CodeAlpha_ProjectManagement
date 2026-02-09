import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Comment } from "../types/comment";
import * as commentAPI from "../api/comment.api";

interface CommentContextType {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  fetchComments: (taskId: number) => Promise<void>;
  addComment: (taskId: number, content: string) => Promise<void>;
}

const CommentContext = createContext<CommentContextType | null>(null);

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async (taskId: number) => {
    const data = await commentAPI.fetchComments(taskId);
    setComments(data);
  };

  const addComment = async (taskId: number, content: string) => {
    const newComment = await commentAPI.addComment(taskId, content);
    setComments((prev) => [...prev, newComment]);
  };

  return (
    <CommentContext.Provider value={{ comments, setComments, fetchComments, addComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) throw new Error("useComments must be used within CommentProvider");
  return context;
};
