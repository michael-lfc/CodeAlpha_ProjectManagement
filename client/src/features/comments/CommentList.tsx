// src/features/comments/CommentList.tsx
import { useComments } from "../../context/CommentContext"; // Use context, not hooks folder
// import "./comments.css";

export const CommentList = () => {
  const { comments } = useComments();

  return (
    <div className="comment-list-container">
      <h4 className="comment-list-title">Comments</h4>
      {comments.length === 0 ? (
        <p className="comment-empty">No comments yet</p>
      ) : (
        <ul className="comment-list">
          {comments.map((c) => (
            <li key={c.id} className="comment-item">
              {c.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
