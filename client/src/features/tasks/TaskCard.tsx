// src/features/tasks/TaskCard.tsx
// import "./tasks.css";

type TaskCardProps = {
  title: string;
  status?: string;
};

export const TaskCard = ({ title, status }: TaskCardProps) => {
  return (
    <div className="task-card">
      <h4 className="task-title">{title}</h4>
      {status && <p className="task-status">{status}</p>}
    </div>
  );
};
