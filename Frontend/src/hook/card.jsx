import { useContext } from "react";
import { CardContext } from "../context/card";

export const useCard = () => {
  const context = useContext(CardContext);

  if (context === undefined) {
    throw new Error("useCard must be used within a BoardProvider");
  }

  return context;
};
