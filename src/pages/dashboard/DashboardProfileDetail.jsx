import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { UserDetailCard } from "@/components/features/UserDetailCard";
import { useFetch } from "@/hooks/useFetch";
import { ProductsGrid } from "@/components/features/ProductsGrid";
import { useAuth } from "@/context/AuthContext";
import { dashboardProfileUrl } from "@/config/paths";

export async function loader({ params }) {
  const { username } = params;

  const user = await useFetch(`/users/${username}`);
  const products = await useFetch(`/users/${username}/products`);

  if (!user) {
    return { userError: "User not found" };
  }
  if (!products) {
    return { productsError: "Product not found" };
  }

  return { user: user.data, products: products.data || [] };
}

export function DashboardProfileDetailPage() {
  const token = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();

  const { user, products, userError, productsError } = useLoaderData();

  if (userError) {
    return <h2>{userError}</h2>;
  }
  if (productsError) {
    return <h2>{productsError}</h2>;
  }

  return (
    <>
      {token && user.user_info == null && (
        <>
          <button
            className="bg-blue-500 px-4 py-2 my-2 rounded-md"
            onClick={() => navigate(`${dashboardProfileUrl}/${username}/new`)}
          >
            Complete Profile
          </button>
        </>
      )}
      {user ? <UserDetailCard user={user} /> : <h2>User not found</h2>}

      <div className="bg-white mt-5">
        <h2 className="mt-5 pl-3 font-medium">User products</h2>

        {products.length > 0 ? (
          <>
            <p className="pl-3 mb-5">{products.length} products</p>
            <div>
              <ProductsGrid products={products} />
            </div>
          </>
        ) : (
          <h2 className="pl-3 my-5">No product yet</h2>
        )}
      </div>
    </>
  );
}
