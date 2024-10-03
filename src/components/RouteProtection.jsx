import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authLoginUrl } from "../config/paths";

export function RouteProtection({ children }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to={authLoginUrl} />;
  }

  return children;
}
