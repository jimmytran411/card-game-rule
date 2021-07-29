import { useState } from "react";

export interface UseDrawer {
  open: boolean;
  handleOpenDrawer: () => void;
  handleCloseDrawer: () => void;
}

export const useDrawer = (): UseDrawer => {
  const [open, setOpen] = useState(true);

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };
  return { open, handleOpenDrawer, handleCloseDrawer };
};
