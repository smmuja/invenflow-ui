import productImg from "/src/assets/product.png";
import productFashionImage from "/src/assets/product-fashion.png";
import productFlowerImage from "/src/assets/product-flower.png";
import productFruitImage from "/src/assets/product-fruit.png";
import productFoodImage from "/src/assets/product-food.png";
import { currencyFormatter, firstEachWordCapitalize } from "../../utils";

export function ProductDetailCard({ product = {} }) {
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

  return (
    <>
      <div
        key={product._id}
        className="w-full sm:max-w-lg bg-white rounded-md border shadow-md"
      >
        <div className="bg-gray-200">
          <h2 className="font-semibold pl-2 pt-2">Product Detail</h2>

          <img
            src={`${getCategoryImage(product.category)}`}
            alt="Product image"
            className="p-2"
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
        </div>
      </div>
    </>
  );
}
