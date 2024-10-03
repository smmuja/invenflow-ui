import { useState } from "react";

export default function useLoadMore(data, itemsPerPage) {
  const [itemsToShow, setItemsToShow] = useState(itemsPerPage);

  const loadedData = (data && data.length ? data : []).slice(0, itemsToShow);

  const hasMore = data && data.length > itemsToShow;

  const loadMoreItems = () => {
    if (hasMore) {
      setItemsToShow((prevItems) => prevItems + itemsPerPage);
    }
  };

  return { loadedData, loadMoreItems, hasMore };
}
