import { useNavigate } from "react-router-dom";
import { currencyFormatter, firstEachWordCapitalize } from "@/utils";
import {
  ProductCategoryBadge,
  ProductCategoryImage,
} from "@/components/product";
import { exploreProductUrl } from "@/config/paths";

export function ProductsGrid({ products }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {products?.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-md border shadow-md p-3"
            >
              <div className="bg-gray-200 w-full">
                <ProductCategoryImage category={product.category} />
              </div>
              <div className="m-3">
                <div className="flex flex-row justify-between mb-2">
                  <p>{firstEachWordCapitalize(product.name)}</p>

                  <ProductCategoryBadge disabled category={product.category} />
                </div>
                <p>{currencyFormatter(product.price)}</p>
                <button
                  onClick={() => {
                    navigate(`${exploreProductUrl}/${product._id}`);
                  }}
                  className="bg-blue-500 px-4 py-2 rounded-md w-full my-3"
                >
                  View product detail
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="ml-3">No products available</p>
        )}
      </div>
    </>
  );
}
