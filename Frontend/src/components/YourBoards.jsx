import { Link } from "react-router-dom";
import boardIcon from "../assets/icons/board.svg";
import recents from "../assets/icons/clock.svg";
import { useRecentBoards } from "../hook/board";
import { useBoards } from "../hook/boards";
import { useEffect, useState } from "react";

export default function YourBoards() {
  const { recentBoards, addBoards } = useRecentBoards();
  const [ recent, setRecents ] = useState([]);
  const { myBoardInfo } = useBoards();
  const { boards, colaborativeBoards } = myBoardInfo;

  useEffect(() => {
    const recentBoard = recentBoards.map(recent => {
      const myBoard = boards.find(board => recent === board.id )
      if(Object.entries(myBoard).length > 0) return myBoard
    })
    setRecents(recentBoard)
  }, [boards])

  return (
    <div className="flex flex-col items-start justify-start w-full col-span-5 md:col-span-7 sm:col-span-7">
      <h1 className="logo text-[24px] mb-4">Tu espacio de trabajo</h1>
      <div className={`grid grid-cols-4 gap-x-8 gap-y-2 w-full`}>
        <div
          className={`flex col-span-4 ${
            recent && recent.length > 0 ? "block" : "hidden"
          }`}
        >
          <img className="w-[25px]" src={recents} alt="" />
          <p className="px-2 text-[18px] logo">Vistos recientemente</p>
        </div>
        {recent && recent.length > 0 &&
          recent
            .slice()
            .reverse()
            .map((recentBoard, index) => {
              return (
                <Link
                  onClick={() => {
                    addBoards(recentBoard);
                  }}
                  to={`/board/${recentBoard.id}`}
                  key={index}
                  className="flex items-center justify-start w-full col-span-1 sm:col-span-2 group"
                >
                  <div
                    className={`relative my-5  w-[200px] h-[100px] rounded-xl overflow-hidden ${
                      !["png", "jpg", "webp"].includes(
                        recentBoard.background.split(".").pop().split("?")[0]
                      )
                        ? `bg-gradient-to-r ${recentBoard.background}`
                        : `bg-cover bg-center`
                    } flex justify-center items-center p-2 group-hover:scale-110  transition-all duration-200`}
                    style={
                      recentBoard.background.split("/")[0] === "local"
                        ? {
                            backgroundImage: `url(/bgImagePreview/${recentBoard.background})`,
                          }
                        : recentBoard.background.split(":")[0] == "https"
                        ? { backgroundImage: `url(${recentBoard.background})` }
                        : null
                    }
                  >
                    <div className="absolute w-full h-full bg-[#00000076]"></div>
                    <p className="absolute text-center">{recentBoard.title}</p>
                  </div>
                </Link>
              );
            })}
        <div
          className={`flex col-span-4 ${
            boards.length > 0 ? "block" : "hidden"
          }`}
        >
          <img src={boardIcon} alt="" />
          <p className="px-2 text-[18px] logo">Todos tus tableros</p>
        </div>
        {boards &&
          boards.map((board, index) => {
            return (
              <Link
                to={`/board/${board.id}`}
                onClick={() => addBoards(board)}
                key={index}
                className="flex items-center justify-start w-full col-span-1 sm:col-span-2 group"
              >
                <div
                  className={`relative my-5  w-[200px] h-[100px] rounded-xl overflow-hidden ${
                    !["png", "jpg", "webp"].includes(
                      board.background.split(".").pop().split("?")[0]
                    )
                      ? `bg-gradient-to-r ${board.background}`
                      : `bg-cover bg-center`
                  } flex justify-center items-center p-2 group-hover:scale-110  transition-all duration-200`}
                  style={
                    board.background.split("/")[0] === "local"
                      ? {
                          backgroundImage: `url(/bgImagePreview/${board.background})`,
                        }
                      : board.background.split(":")[0] == "https"
                      ? { backgroundImage: `url(${board.background})` }
                      : null
                  }
                >
                  <div className="absolute w-full h-full bg-[#00000076]"></div>
                  <p className="absolute text-center">{board.title}</p>
                </div>
              </Link>
            );
          })}
        <div
          className={`flex col-span-4 ${
            colaborativeBoards.length > 0 ? "block" : "hidden"
          }`}
        >
          <img src={boardIcon} alt="" />
          <p className="px-2 text-[18px] logo">Todos tus tableros colaborativos</p>
        </div>
        {colaborativeBoards &&
          colaborativeBoards.map((board, index) => {
            return (
              <Link
                to={`/board/${board.id}`}
                onClick={() => addBoards(board)}
                key={index}
                className="flex items-center justify-start w-full col-span-1 sm:col-span-2 group"
              >
                <div
                  className={`relative my-5  w-[200px] h-[100px] rounded-xl overflow-hidden ${
                    !["png", "jpg", "webp"].includes(
                      board.background.split(".").pop().split("?")[0]
                    )
                      ? `bg-gradient-to-r ${board.background}`
                      : `bg-cover bg-center`
                  } flex justify-center items-center p-2 group-hover:scale-110  transition-all duration-200`}
                  style={
                    board.background.split("/")[0] === "local"
                      ? {
                          backgroundImage: `url(/bgImagePreview/${board.background})`,
                        }
                      : board.background.split(":")[0] == "https"
                      ? { backgroundImage: `url(${board.background})` }
                      : null
                  }
                >
                  <div className="absolute w-full h-full bg-[#00000076]"></div>
                  <p className="absolute text-center">{board.title}</p>
                </div>
              </Link>
            );
          })}
        
        <div
          className={`flex flex-col col-span-4 w-[800px] ${
            recent && recent.length === 0 && boards.length === 0 && colaborativeBoards.length === 0
              ? "block"
              : "hidden"
          }`}
        >
          <img
            className={`w-full h-auto `}
            src="/board/withoutBoards.jpg"
            alt=""
          />
          <p className="font-bold text-[18px]">
            Aun no tienes tableros, crea uno o unete a un tablero colaborativo
          </p>
        </div>
      </div>
    </div>
  );
}
