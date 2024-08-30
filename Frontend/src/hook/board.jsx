import { useContext } from "react";
import { RecentsBoardsContext } from "../context/recentesBoards";

export const useRecentBoards = () => {
  const context = useContext(RecentsBoardsContext);

  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardProvider");
  }

  return context;
};
