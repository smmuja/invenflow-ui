import productImg from "/src/assets/product.png";
import productFashionImage from "/src/assets/product-fashion.png";
import productFlowerImage from "/src/assets/product-flower.png";
import productFruitImage from "/src/assets/product-fruit.png";
import productFoodImage from "/src/assets/product-food.png";

export function ProductCategoryImage({ category, ...rest }) {
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
      <img
        src={`${getCategoryImage(category)}`}
        alt="Product image"
        className="w-full p-2"
      />
    </>
  );
}
