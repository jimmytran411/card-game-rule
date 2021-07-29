import React, { ChangeEvent, useState } from "react";

export interface UsePagination {
  page: number;
  itemsPerPage: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeItemsPerPage: (event: ChangeEvent<any>) => void;
}

export const usePagination = (): UsePagination => {
  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeItemsPerPage = (event: ChangeEvent<any>) => {
    setItemsPerPage(Number(event.target.value));
    setPage(0);
  };

  return { page, itemsPerPage, handleChangePage, handleChangeItemsPerPage };
};
