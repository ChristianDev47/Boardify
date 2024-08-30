import { useContext } from "react";
import { BoardContext } from "../context/board";

export const useBoards = () => {
  const context = useContext(BoardContext);

  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardProvider");
  }

  return context;
};
