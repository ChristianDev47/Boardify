/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  UpdateBoard,
} from "../services/project";
import boardIcon from "../assets/icons/board.svg";
import dots from "../assets/icons/dots.svg";
import filter from "../assets/icons/filter.svg";
import MenuBoard from "./Board/Menu";
import TableComponent from "./Board/Table";
import { useAuth } from "../hook/useAuth";
import { FiltersProvider } from "../context/filter";
import { charValue } from "../services/getInitialsUsers";
import { useList } from "../hook/lists";
import { useBoards } from "../hook/boards";
import { useCard } from "../hook/card";

export default function Table() {
  const { user } = useAuth();
  const { id } = useParams();
  const [nameBoard, setNameBoard] = useState();
  const [showFilter, setShowFilter] = useState(false);
  const [members, setMembers] = useState([]);
  const { listsData } = useList();
  const { lists } = listsData;
  const { myBoardInfo } = useBoards();
  const { myBoard: board } = myBoardInfo;
  const { cardsAllData} = useCard();
  const { cards } = cardsAllData;

  useEffect(() => {
    if (Object.entries(board).length > 0) {
      setNameBoard(board.title);
    }
  }, [board]);

  useEffect(() => {
    if (id) {
      const getCardData = async () => {
        let members = [];
        for (const list of lists) {
          if(cards[list._id]){
            cards[list._id].map(card => {
              if (card.members.length > 0) {
                members.push(...card.members);
              }
            })
          }
        }
        if(members){
          const uniqueMembers = members.filter(
            (obj, index, self) =>
              index ===
              self.findIndex((o) => o.member_id.email === obj.member_id.email)
          );
          setMembers(uniqueMembers);
        }
      };
      Object.entries(user).length > 0 && getCardData();
    }
  }, [id]);

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

  return (
    <FiltersProvider>
      <React.StrictMode>
        {board && (
          <>
            <div
              className={`z-30 w-full h-full min-h-[100vh] text-white  text-[18px] transition-all`}
            >
              <div className="relative w-full h-[60px] flex justify-between items-center sm:min-w-[525px] bg-[#13141a95]">
                <div className="flex items-center justify-end w-auto mx-4">
                  <img
                    className="w-[27px] h-auto mx-1 "
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
                <div className="flex gap-2">
                  {members && members.length > 0 && (
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
                                    ? {
                                        backgroundImage: `url(${user.profile})`,
                                      }
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
                    onClick={() => setShowFilter(true)}
                    className="flex items-center justify-center p-2 mr-2 bg-gray-500 rounded-md cursor-pointer"
                  >
                    <img className="w-[18px] h-auto mr-2" src={filter} alt="" />
                    <p className=" text-[13px]">Filtrar</p>
                  </div>
                  <div
                    onClick={() => setShowMenu("translate-x-[0px]")}
                    className="flex items-center justify-center p-2 mr-4 bg-gray-500 rounded-md cursor-pointer"
                  >
                    <img className="w-[23px] h-auto mr-2" src={dots} alt="" />
                    <p className=" text-[13px]">Mostrar Menu</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-full p-4 ">
                <TableComponent
                  setShowFilter={setShowFilter}
                  showFilter={showFilter}
                  members={members}
                />
              </div>
            </div>
            <MenuBoard
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
          </>
        )}
      </React.StrictMode>
    </FiltersProvider>
  );
}
