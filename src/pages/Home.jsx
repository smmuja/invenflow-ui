import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function HomePage() {
  const { token } = useAuth();
  const { currentUser } = useAuth();
  return (
    <>
      <div className="flex items-center justify-center bg-gray-50 min-h-screen">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-center">
            Welcome to Invenflow UI
          </h1>

          {!token && (
            <div className="flex justify-center space-x-4">
              <Link
                to="/login"
                className="text-white bg-blue-500 rounded-md px-4 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className=" bg-gray-200 rounded-md px-4 py-2"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
