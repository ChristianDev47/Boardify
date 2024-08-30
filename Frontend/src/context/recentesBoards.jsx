import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

// Contexto
export const RecentsBoardsContext = createContext({
  recentBoards: [],
  addBoards: () => {},
  deleteBoards: () => {},
  clearBoards: () => {},
});

// Provider
export function RecentsBoardsProvider({ children }) {
  const [recentBoards, setRecentsBoards] = useState([]);
  useEffect(() => {
    const storedBoards = Cookies.get("recentBoards");
    if (storedBoards) {
      try {
        const parsedBoards = JSON.parse(storedBoards);
        setRecentsBoards(parsedBoards);
      } catch (error) {
        console.error("Error al obtener los tableros:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(recentBoards).length > 0) {
      Cookies.set("recentBoards", JSON.stringify(recentBoards));
    }
  }, [recentBoards]);

  const addBoards = useCallback(
    (newRecentsBoards) => {
      const newData = recentBoards.filter(
        (board) => newRecentsBoards.id !== board
      );
      setRecentsBoards([...newData, newRecentsBoards.id]);
    },
    [recentBoards]
  );

  const deleteBoards = useCallback(
    (boardEliminate) => {
      const newData = recentBoards.filter(
        (board) => boardEliminate.id !== board
      );
      setRecentsBoards(newData);
    },
    [recentBoards]
  );

  const clearBoards = () => {
    setRecentsBoards([]);
    Cookies.set("recentBoards", []);

  };

  const value = useMemo(
    () => ({
      recentBoards,
      clearBoards,
      addBoards,
      deleteBoards,
    }),
    [recentBoards, addBoards, deleteBoards]
  );

  return (
    <RecentsBoardsContext.Provider value={value}>
      {children}
    </RecentsBoardsContext.Provider>
  );
}

RecentsBoardsProvider.propTypes = {
  children: PropTypes.node,
};
