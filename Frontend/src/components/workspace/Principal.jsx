/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useRecentBoards } from "../../hook/board";
import { useBoards } from "../../hook/boards";
import CreateBoard from "./CreateBoard";
import ModalToggle from "../../ui/ModalToggle";

export default function PrincipalBoardPage() {
  const { addBoards } = useRecentBoards();
  const { myBoardInfo } = useBoards();
  const { boards, colaborativeBoards } = myBoardInfo;
  return (
    <>
      <div className="flex flex-col items-start justify-start col-span-5 md:col-span-7 sm:col-span-7">
        <h1 className="logo text-[24px] mt-2 mb-4">Manténgase al tanto y al día</h1>
        <p>
          Crea tableros, listas y tarjetas, deje comentarios y añada fechas de
          vencimiento. Le mostraremos la actividad más importante aquí.
        </p>
        <img
          className="w-[860px] h-auto rounded-2xl my-6"
          src="/board/startBoard.jpg"
          alt=""
        />
        <p className="px-2">Enlaces</p>
        <ModalToggle
          modalId="create_modal_botton"
          toggleButtonId="recent-toggle-btn"  
          ModalComponent={CreateBoard}
          className="w-[350px] cursor-pointer flex items-center justify-start my-4 hover:bg-[#69696982] transition-all duration-150 rounded-md p-2"
          title={
            <>
              <div className="w-[2.5rem] h-[2.5rem] bg-[#71717183] flex justify-center items-center rounded-lg mr-4 text-[22px]">
              +
              </div>
              <p className="text-[17px]">Cree un tablero</p>
            </>
          }
          options="botton"
        />
        {boards && boards.length > 0 && (
          <>
            <div className={`grid grid-cols-4 gap-x-4 gap-y-2`}>
              <p className="col-span-4 px-2">Tus tableros</p>
              {boards.map((board, index) => {
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
                      <div className="absolute w-full h-full bg-[#00000093]"></div>
                      <p className="absolute text-center">{board.title}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
        {colaborativeBoards && colaborativeBoards.length > 0 && (
          <>
            <div className={`grid grid-cols-4 gap-x-8 gap-y-2`}>
              <p className="col-span-4 px-2">Colaborativos</p>
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
                        <div className="absolute w-full h-full bg-[#00000093]"></div>
                        <p className="absolute text-center">{board.title}</p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
