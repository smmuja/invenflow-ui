import { authLoginUrl, authRegisterUrl } from "../../config/paths";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export function LoginLogoutButton() {
  const { logout, token } = useAuth();

  return (
    <>
      {!token ? (
        <>
          <Link
            to={authLoginUrl}
            className=" bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Login
          </Link>
          <Link
            to={authRegisterUrl}
            className="  bg-gray-200 rounded-md px-4 py-2"
          >
            Register
          </Link>
        </>
      ) : (
        <div className="px-4">
          <button
            onClick={logout}
            className=" bg-gray-200 rounded-md px-4 py-2"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
