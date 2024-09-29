import { useLoaderData } from "react-router-dom";
import { ProductsCard } from "../components/ProductsCard";
import { useFetch } from "../hooks/useFetch";

export async function loader() {
  const products = await useFetch(`/products`);
  console.log(products);
  return { products: products.data };
}

export function ProductsExplorePage() {
  const { products } = useLoaderData();
  console.log(products);
  return (
    <>
      <ProductsCard products={products} />
    </>
  );
}
