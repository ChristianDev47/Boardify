/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import NavbarBoard from "./Board/NavbarTop";
import NavbarLeft from "./Board/NavbarLeft";
import CardModal from "./Board/CardEdit";
import { useBoards } from "../hook/boards";
import { Outlet, useParams } from "react-router-dom";
import { ResponsiveProvider } from "../context/responsiveNavbar";
import Loading from "../ui/Loading";
import { useCard } from "../hook/card";
import { useList } from "../hook/lists";

export default function NavBoard() {
  const { myBoardInfo, getBoardById } = useBoards();
  const { myBoard: board } = myBoardInfo;

  const {id} = useParams() 
  const { cardsAllData, getCardByList, updateCardData } = useCard();
  const { myCard } = cardsAllData;
  const {  getListByBoard } = useList();

  useEffect(() => {
    const getData = async () => {
      getBoardById(id);
      const myLists = await getListByBoard(id);
      let promises = {};
      for (const list of myLists) {
        const mylistCards = await getCardByList(list._id);
        if (mylistCards.length !== 0) {
          mylistCards.sort((a, b) => a.position - b.position);
          promises[list._id] = mylistCards;
        }
      }
      updateCardData(promises);
    }
    if(id) getData();

  }, [id]);

  return (
    <React.StrictMode>
      <ResponsiveProvider>
        <Loading>
          {Object.entries(board).length > 0 && (
            <div
              className={`relative w-[100vw] min-h-[100vh] h-full ${
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
            >
              <div className="absolute w-full h-full bg-[#00000068]"></div>
              <NavbarBoard />
              <div className="flex w-full h-full  pt-[3.8rem] relative">
                <NavbarLeft />
                <Outlet />
              </div>
              {myCard && Object.entries(myCard).length > 0 && <CardModal board={board} />}
            </div>
          )}
        </Loading>
      </ResponsiveProvider>
    </React.StrictMode>
  );
}
