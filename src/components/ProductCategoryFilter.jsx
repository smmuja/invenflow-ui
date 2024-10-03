import { useState } from "react";
import { ProductCategoryBadge } from "./ProductCategoryBadge";
import { useSearchParams } from "react-router-dom";

const categories = [
  "All",
  "fruit",
  "fashion",
  "food",
  "flower",
  "accessories",
  "drink",
];

export function ProductCategoryFilter({ onCategoryChange }) {
  const [isAccordionActive, setIsAccordionActive] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");

  const handleCategoryClick = (category) => {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
    onCategoryChange(category);
  };

  const handleAccordion = () => {
    setIsAccordionActive(!isAccordionActive);
  };

  return (
    <>
      <div
        onClick={handleAccordion}
        className="hover:cursor-pointer text-black/50 flex justify-between"
      >
        <h2 className="px-5 my-5 text-balck/50">
          Filter product based on category
        </h2>
        <button>{isAccordionActive ? "˄" : "˅"}</button>
      </div>

      {isAccordionActive && (
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 pb-5 px-3 ">
          {categories.map((category) => (
            <ProductCategoryBadge
              onClick={() => handleCategoryClick(category)}
              key={category}
              category={category}
              style={{
                cursor: "pointer",
                border:
                  selectedCategory === category
                    ? "2px solid blue"
                    : "2px solid transparent",
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
