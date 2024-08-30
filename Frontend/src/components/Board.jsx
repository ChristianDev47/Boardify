/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import boardIcon from "../assets/icons/board.svg";
import dots from "../assets/icons/dots.svg";
import ListComponent from "./Board/Lists";
import MenuBoard from "./Board/Menu";
import { useBoards } from "../hook/boards";
import { useParams } from "react-router-dom";

export default function Board() {
  const { myBoardInfo, updateBoards } = useBoards();
  const { myBoard: board } = myBoardInfo;
  const params = useParams();
  const { id } = params;
  const [nameBoard, setNameBoard] = useState("");
  const [showMenu, setShowMenu] = useState("translate-x-[400px]");

  useEffect(() => {
    if (Object.entries(board).length > 0) {
      setNameBoard(board.title);
    }
  }, [board]);

  const hadleNameUpdate = (event) => {
    const updatename = async () => {
      const newBoardName = event.target.value;
      if (newBoardName.trim() !== "" && board.title !== newBoardName.trim()) {
        const boardData = { title: newBoardName };
        updateBoards(id, boardData);
        setNameBoard(nameBoard);
      } else {
        setNameBoard(board.title);
      }
    };
    updatename();
  };

  return (
    <>
      <div
        className='z-30 h-full w-[70%] text-white transition-all flex-grow relative pt-[60px]'
      >
        <div className="w-full h-[60px] max-w-[100%] bg-[#13141a95] flex justify-between items-center absolute top-0 left-0 z-20">
          <div className="flex items-center justify-end w-full mx-4 ">
            <img className="w-[27px] h-auto mx-1 " src={boardIcon} alt="" />
            <input
              className=" p-1 bg-transparent border-none text-[22px] sm:text-[18px] logo inline-block w-full md:w-[160px] sm:w-[100px]"
              value={nameBoard}
              onChange={(e) => setNameBoard(e.target.value)}
              onBlur={(e) => hadleNameUpdate(e)}
              type="text"
            />
          </div>
          <div
            onClick={() => setShowMenu("translate-x-[0px]")}
            className="p-2 mr-4 rounded-md cursor-pointer hover:bg-gray-500"
          >
            <img className="w-[27px] " src={dots} alt="" />
          </div>
        </div>
        <ListComponent />
      </div>
      <MenuBoard showMenu={showMenu} setShowMenu={setShowMenu} />
    </>
  );
}
