import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export function NavItem() {
  const { token } = useAuth();

  return (
    <>
      {token ? (
        <>
          <Link
            to="/products"
            className="rounded-md px-4 py-2 hover:bg-gray-200"
          >
            Products
          </Link>
          <Link
            to="/business"
            className="rounded-md px-4 py-2 hover:bg-gray-200"
          >
            Business
          </Link>
        </>
      ) : null}
    </>
  );
}
