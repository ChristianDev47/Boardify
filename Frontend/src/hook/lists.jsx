import { useContext } from "react";
import { ListContext } from "../context/list";

export const useList = () => {
  const context = useContext(ListContext);

  if (context === undefined) {
    throw new Error("useList must be used within a BoardProvider");
  }

  return context;
};
