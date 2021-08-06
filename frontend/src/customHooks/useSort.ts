import { useEffect, useState } from "react";
import _ from "lodash";

import { ListHeaderProps } from "../Components/TableOfContents/ListHeader";

type UseSort<T> = {
  handleSort: (element: string) => void;
  order: "desc" | "asc";
  orderBy: string;
  sortedData: T[];
};

export const useSort = <T extends { [key: string]: any }>(
  data: T[]
): UseSort<T> => {
  const [{ order, orderBy }, setCurrentSort] = useState<
    Pick<ListHeaderProps, "order" | "orderBy">
  >({
    orderBy: "chapterId",
    order: "asc",
  });
  const [sortedData, setSortedData] = useState<typeof data>([]);

  const handleSort = (element: string) => {
    if (orderBy === element) {
      order === "asc"
        ? setCurrentSort({ orderBy, order: "desc" })
        : setCurrentSort({ orderBy, order: "asc" });
    } else {
      setCurrentSort({ orderBy: element, order: "asc" });
    }
  };

  useEffect(() => {
    const sortData = _.orderBy(data, [orderBy], [order]);
    setSortedData(sortData);
  }, [order, orderBy, data]);

  return { handleSort, order, orderBy, sortedData };
};
