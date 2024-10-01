import { useLoaderData } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { ProductDetailCard } from "../components/ProductExploreDetail/ProductDetailCard";
import { ProductDetailOwner } from "../components/ProductExploreDetail/ProductDetailOwner";

export async function loader({ params }) {
  const { productId } = params;

  const product = await useFetch(`/products/${productId}`);
  console.log(product);
  console.log(productId);

  console.log(params.productid);
  return { product: product.data };
}

export function ProductsExploreDetailPage() {
  const { product } = useLoaderData();
  console.log(product);
  return (
    <div className="flex flex-col items-center sm:flex-row  sm:items-start sm:justify-center sm:gap-5 lg:mx-32 lg:py-10">
      <ProductDetailCard product={product} />
      <ProductDetailOwner product={product} />
    </div>
  );
}
