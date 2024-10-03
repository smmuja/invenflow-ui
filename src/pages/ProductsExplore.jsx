import { useLoaderData, useSearchParams } from "react-router-dom";
import { ProductsCard } from "../components/ProductsCard";
import { useFetch } from "../hooks/useFetch";
import { ProductCategoryFilter } from "../components/ProductCategoryFilter";
import { useEffect, useState } from "react";

export async function loader() {
  const products = await useFetch(`/products`);
  console.log(products);
  return { products: products.data };
}

export function ProductsExplorePage() {
  const { products } = useLoaderData();
  console.log(products);

  const [filteredProducts, setFilteredProducts] = useState();
  const [searchParams] = useSearchParams();

  const handleCategoryChange = (category) => {
    if (category === "All" || !category) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  // To keep loading products all when no category selected
  useEffect(() => {
    const selectedCategory = searchParams.get("category") || "All";
    handleCategoryChange(selectedCategory);
  }, [searchParams]);
  return (
    <>
      <ProductCategoryFilter onCategoryChange={handleCategoryChange} />
      <ProductsCard products={filteredProducts} />
    </>
  );
}
