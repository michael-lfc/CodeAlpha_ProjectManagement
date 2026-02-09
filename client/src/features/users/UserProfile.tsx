// src/features/users/UserProfile.tsx
import { useAuth } from "../../hooks/useAuth";
// import "./users.css";

export const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return <p>No user logged in</p>;

  return (
    <div className="user-profile-container">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role || "User"}</p>
    </div>
  );
};
