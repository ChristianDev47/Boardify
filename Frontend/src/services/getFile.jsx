import { useEffect, useState } from "react";
import { GetBoardFile } from "./project";

export default function GetFile(board) {
  const [backgroundData, setBackgroundData] = useState("");
  useEffect(() => {
    if (Object.entries(board).length > 0) {
      if (
        ["jpg", "png", "webp"].includes(
          board.background.split(".").pop().split("?")[0]
        )
      ) {
        getFile(board.background)
          .then(setBackgroundData)
          .catch((error) => {
            console.error("Error fetching file data:", error);
          });
      } else {
        setBackgroundData(board.background);
      }
    }
  }, [board]);

  const getFile = async (file) => {
    return await GetBoardFile(file);
  };

  return { backgroundData };
}
