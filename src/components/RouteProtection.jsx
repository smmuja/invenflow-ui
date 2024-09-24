import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RouteProtection({ children }) {
  //   const navigate = useNavigate();

  const { token } = useAuth();
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return children;
}
