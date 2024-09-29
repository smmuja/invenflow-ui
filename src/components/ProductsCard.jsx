import { useNavigate } from "react-router-dom";
import { currencyFormatter, firstEachWordCapitalize } from "../utils";
import productImg from "/src/assets/product.png";
import productFashionImage from "/src/assets/product-fashion.png";
import productFlowerImage from "/src/assets/product-flower.png";
import productFruitImage from "/src/assets/product-fruit.png";
import productFoodImage from "/src/assets/product-food.png";

export function ProductsCard({ products }) {
  const getCategoryTag = (category) => {
    switch (category) {
      case "fashion":
        return "bg-green-400";
      case "fruit":
        return "bg-yellow-400";
      case "flower":
        return "bg-pink-400";
      case "food":
        return "bg-purple-400";
      default:
        return "bg-blue-400";
    }
  };
  const getCategoryImage = (category) => {
    switch (category) {
      case "fashion":
        return productFashionImage;
      case "fruit":
        return productFruitImage;
      case "flower":
        return productFlowerImage;
      case "food":
        return productFoodImage;
      default:
        return productImg;
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-md border shadow-md p-3"
          >
            <div className="bg-gray-200 w-full">
              <img
                src={`${getCategoryImage(product.category)}`}
                alt="Product image"
                className="w-full p-2"
              />
            </div>
            <div className="m-3">
              <div className="flex flex-row justify-between mb-2">
                <p>{firstEachWordCapitalize(product.name)}</p>
                <button
                  className={`${getCategoryTag(
                    product.category
                  )} bg-blue-300 px-2 py-1 rounded-md text-sm`}
                >
                  {product.category}
                </button>
              </div>
              <p>{currencyFormatter(product.price)}</p>
              <button
                onClick={() => {
                  navigate(`/explore/products/${product._id}`);
                }}
                className="bg-blue-500 px-4 py-2 rounded-md w-full my-3"
              >
                View product detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
