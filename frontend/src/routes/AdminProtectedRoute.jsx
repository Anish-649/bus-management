import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const admin_id = localStorage.getItem("admin_id");

  if (!admin_id) {
    return <Navigate to="/login" />;
  }

  return children;
}
