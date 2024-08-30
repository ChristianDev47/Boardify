import { Link } from "react-router-dom";
import { useRecentBoards } from "../../hook/board";
import { useEffect, useState } from "react";
import { useBoards } from "../../hook/boards";


export default function RecentModal() {
  const { recentBoards } = useRecentBoards();
  const [ recent, setRecents ] = useState([]);
  const { myBoardInfo } = useBoards();
  const { boards } = myBoardInfo;

  useEffect(() => {
    const recentBoard = recentBoards.map(recent => {
      return boards.find(board => recent === board.id )
    })
    setRecents(recentBoard)
  }, [boards])


  return (
    <ul className="absolute top-10 2xl:left-0 xl:left-0 lg:left-0 md:left-0 sm:right-0 w-[300px] sm:w-[230px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl">
      {recentBoards.length > 0 ? (
        recent.map((board) => {
          return (
            <li className="mx-1" key={board.id}>
              <Link
                to={`/board/${board.id}`}
                className="flex items-center justify-start hover:bg-[#d1d1d19b] rounded-lg"
              >
                <div
                  className={`relative my-2 mx-2  w-[30px] h-[30px] rounded-md overflow-hidden ${
                    !["png", "jpg", "webp"].includes(
                      board.background.split(".").pop().split("?")[0]
                    )
                      ? `bg-gradient-to-r ${board.background}`
                      : `bg-cover bg-center`
                  } flex justify-center items-center z-30 `}
                  style={
                    board.background.split("/")[0] === "local"
                      ? {
                          backgroundImage: `url(/bgImagePreview/${board.background})`,
                        }
                      : board.background.split(":")[0] == "https"
                      ? { backgroundImage: `url(${board.background})` }
                      : null
                  }
                ></div>
                <p>{board.title}</p>
              </Link>
            </li>
          );
        })
      ) : (
        <li>
          {" "}
          <Link
            to="/miespaciodetrabajo/boards"
            className={`flex items-center justify-start transition-all duration-100 w-full hover:bg-[#242a58] p-2 my-1 rounded-lg`}
          >
            Trabaja en un tablero para tener tableros recientes
          </Link>
        </li>
      )}
    </ul>
  );
}
