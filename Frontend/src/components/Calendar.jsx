import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetBoardById,
  GetBoardFile,
  GetCardByList,
  GetListsByBoard,
  UpdateBoard,
} from "../services/project";
import boardIcon from "../assets/icons/board.svg";
import dots from "../assets/icons/dots.svg";
import MenuBoard from "./Board/Menu";
import { useAuth } from "../hook/useAuth";
import { FiltersProvider } from "../context/filter";
import CalendarWithData from "./Board/Calendar";
import { charValue } from "../services/getInitialsUsers";

export default function CalendarComponent() {
  const { user } = useAuth();
  const { id } = useParams();
  const [board, setBoard] = useState();
  const [nameBoard, setNameBoard] = useState();
  const [members, setMembers] = useState(false);

  useEffect(() => {
    if (id) {
      const getBoard = async () => {
        const myBoard = await GetBoardById({ id });
        setNameBoard(myBoard.title);
        setBoard(myBoard);
      };
      getBoard();
      const getCardData = async () => {
        const lists = await GetListsByBoard({ boardId: id });
        const myBoard = await GetBoardById({ id });
        setBoard(myBoard);
        let members = [];
        for (const list of lists) {
          const mycards = await GetCardByList({ listId: list._id });
          for (const card of mycards) {
            if (card.members.length > 0) {
              members.push(...card.members);
            }
          }
        }
        const uniqueMembers = members.filter(
          (obj, index, self) =>
            index ===
            self.findIndex((o) => o.member_id.email === obj.member_id.email)
        );
        setMembers(uniqueMembers);
      };
      Object.keys(user).length > 0 && getCardData();
    }
  }, [id, user]);

  const hadleNameUpdate = (event) => {
    const updatename = async () => {
      const newBoardName = event.target.value;
      if (newBoardName.trim() !== "" && board.title !== newBoardName.trim()) {
        await UpdateBoard({ id: board.id, data: { title: newBoardName } });
      } else {
        setNameBoard(board.title);
      }
    };
    updatename();
  };

  const [showMenu, setShowMenu] = useState("translate-x-[400px]");

  const [backgroundData, setBackgroundData] = useState("");
  useEffect(() => {
    if (board) {
      if (["jpg", "png", "webp"].includes(board.background.split(".").pop())) {
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

  return (
    <FiltersProvider>
      {board && (
        <>
          <div className={`z-30 h-full w-[70%] text-white transition-all flex-grow relative `}>
            <div className="relative w-full h-[60px] flex justify-between items-center  sm:min-w-[760px] bg-[#13141a95]">
            <div className="flex items-center justify-end w-auto mx-4">
                  <img
                    className="w-[23px] h-auto mx-1 "
                    src={boardIcon}
                    alt=""
                  />
                  <input
                    className="p-1 bg-transparent border-none text-[22px] sm:text-[18px] logo inline-block w-full md:w-[160px] sm:w-[100px]"
                    value={nameBoard}
                    onChange={(e) => setNameBoard(e.target.value)}
                    onBlur={(e) => hadleNameUpdate(e)}
                    type="text"
                  />
                </div>
              <div className="flex">
                {members.length > 0 && (
                  <div className="flex items-center justify-center gap-2 mx-2">
                    {members.slice(0, 4).map((member) => {
                      const { member_id: user } = member;
                      return (
                        <div
                          key={member.member_id.id}
                          className="flex items-center rounded-sm cursor-pointer "
                        >
                          {user && user.profile && user.profile !== "" ? (
                            <div
                              title={user.email}
                              className={`relative cursor-pointer w-[35px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
                                !["png", "jpg", "webp"].includes(
                                  user.profile.split(".").pop().split("?")[0]
                                )
                                  ? `bg-[#0065FF]`
                                  : `bg-cover bg-center`
                              }`}
                              style={
                                user.profile.split(":")[0] == "https"
                                  ? { backgroundImage: `url(${user.profile})` }
                                  : null
                              }
                            >
                              {user.profile.split(":")[0] !== "https" &&
                                charValue(user.name, user.surname)}
                            </div>
                          ) : (
                            user.name &&
                            user.surname && (
                              <div
                                title={user.email}
                                className=" w-[35px] h-[35px] cursor-pointer bg-[#0065FF] text-[12px] font-bold rounded-full aspect-square text-white flex justify-center items-center "
                              >
                                {charValue(user.name, user.surname)}
                              </div>
                            )
                          )}
                        </div>
                      );
                    })}
                    {members.length > 4 && (
                      <div className="flex items-center rounded-sm cursor-pointer ">
                        <div className="relative w-[30px] h-[30px] flex items-center justify-center font-semibold bg-gray-500 hover:bg-gray-400 rounded-full aspect-square mx-0.5">
                          <div className="text-[14px] text-white">+1</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div
                  onClick={() => setShowMenu("translate-x-[0px]")}
                  className="flex items-center justify-center p-2 mr-4 bg-gray-500 rounded-md cursor-pointer"
                >
                  <img className="w-[23px] h-auto mr-2" src={dots} alt="" />
                  <p className=" text-[13px]">Mostrar Menu</p>
                </div>
              </div>
            </div>
            <CalendarWithData id={id} />
          </div>
          <MenuBoard
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            board={board}
            backgroundData={backgroundData}
            setBoard={setBoard}
          />
        </>
      )}
    </FiltersProvider>
  );
}
