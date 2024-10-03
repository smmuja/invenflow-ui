import { useLoaderData, useSearchParams } from "react-router-dom";
import { ProductsCard } from "../components/ProductsCard";
import { useFetch } from "../hooks/useFetch";
import { ProductCategoryFilter } from "../components/ProductCategoryFilter";
import { useEffect, useState } from "react";
import usePagination from "../hooks/usePagination";
import useLoadMore from "../hooks/useLoadMore";

export async function loader() {
  const products = await useFetch(`/products`);
  console.log(products);
  return { products: products.data };
}

export function ProductsExplorePage() {
  const { products } = useLoaderData();
  console.log(products);

  const itemsPerPage = 10;

  const { loadedData, loadMoreItems, hasMore } = useLoadMore(
    products,
    itemsPerPage
  );

  const [filteredProducts, setFilteredProducts] = useState(loadedData || []);
  const [searchParams] = useSearchParams();

  const handleCategoryChange = (category) => {
    if (category === "All" || !category) {
      setFilteredProducts(loadedData);
    } else {
      const filtered = loadedData.filter(
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

  console.log(loadedData);
  return (
    <>
      <ProductCategoryFilter onCategoryChange={handleCategoryChange} />
      <div className="p-3">
        <p>
          {filteredProducts.length} products shown out of total{" "}
          {products.length} products
        </p>
        {hasMore && (
          <button
            className="px-4 py-2 my-2 rounded-md bg-green-500 text-sm"
            onClick={loadMoreItems}
          >
            Load More Products
          </button>
        )}
      </div>

      <ProductsCard products={filteredProducts} />
    </>
  );
}
