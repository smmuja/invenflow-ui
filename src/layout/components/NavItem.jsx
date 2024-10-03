import {
  dashboardProductUrl,
  exploreProductUrl,
  exploreUserUrl,
} from "../../config/paths";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export function NavItem() {
  const { token } = useAuth();

  return (
    <>
      {token ? (
        <>
          <Link
            to={exploreProductUrl}
            className="rounded-md px-4 py-2 hover:bg-gray-200"
          >
            Explore Products
          </Link>
          <Link
            to={exploreUserUrl}
            className="rounded-md px-4 py-2 hover:bg-gray-200"
          >
            Explore Partners
          </Link>
          <Link
            to={dashboardProductUrl}
            className="rounded-md px-4 py-2 hover:bg-gray-200"
          >
            My Dashboard
          </Link>
        </>
      ) : null}
    </>
  );
}
