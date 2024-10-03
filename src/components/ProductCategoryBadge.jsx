export function ProductCategoryBadge({ category, ...rest }) {
  const getCategoryColor = (category) => {
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

  return (
    <>
      <button
        {...rest}
        className={`${getCategoryColor(
          category
        )} bg-blue-300 px-2 py-1 rounded-md text-sm`}
      >
        {category}
      </button>
    </>
  );
}
