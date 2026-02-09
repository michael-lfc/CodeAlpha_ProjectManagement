// src/components/Error.tsx
interface ErrorProps {
  message: string;
}

export const Error = ({ message }: ErrorProps) => (
  <div style={{ color: "red", textAlign: "center", padding: "1rem" }}>
    <p>{message}</p>
  </div>
);
