// src/components/Loading.tsx
export const Loading = () => (
  <div style={{ textAlign: "center", padding: "1rem" }}>
    <p>Loading...</p>
  </div>
);

// src/components/Error.tsx
interface ErrorProps {
  message: string;
}

export const Error = ({ message }: ErrorProps) => (
  <div style={{ color: "red", textAlign: "center", padding: "1rem" }}>
    <p>{message}</p>
  </div>
);
