import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export function NavItem() {
  const { token } = useAuth();

  return (
    <>
      {token ? (
        <>
          <Link
            to="/explore/products"
            className="rounded-md px-4 py-2 hover:bg-gray-200"
          >
            Explore Products
          </Link>
          <Link
            to="/explore/partners"
            className="rounded-md px-4 py-2 hover:bg-gray-200"
          >
            Explore Partners
          </Link>
          <Link
            to="/dashboard/products"
            className="rounded-md px-4 py-2 hover:bg-gray-200"
          >
            My Dashboard
          </Link>
        </>
      ) : null}
    </>
  );
}
