import { useLoaderData } from "react-router-dom";
import { UserDetailCard } from "@/components/features/UserDetailCard";
import { fetcher } from "@/utils";
import { ProductsGrid } from "@/components/features/ProductsGrid";

export async function loader({ params }) {
  const { username } = params;

  const user = await fetcher(`/users/${username}`);
  const products = await fetcher(`/users/${username}/products`);

  if (!user) {
    return { userError: "User not found" };
  }
  if (!products) {
    return { productsError: "Product not found" };
  }

  return { user: user.data, products: products.data || [] };
}

export function ExploreUserDetailPage() {
  const { user, products, userError, productsError } = useLoaderData();

  if (userError) {
    return <h2>{userError}</h2>;
  }
  if (productsError) {
    return <h2>{productsError}</h2>;
  }

  return (
    <>
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
