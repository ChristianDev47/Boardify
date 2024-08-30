/* eslint-disable react-hooks/exhaustive-deps */
import BoardSkeleton from "../../assets/skeleton/board-skeloton.svg";
import load from "../../assets/icons/load.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecentBoards } from "../../hook/board";
import { backgroudImages, bgColors } from "../../services/colors";
import { useBoards } from "../../hook/boards";
import PropTypes from 'prop-types';


CreateBoard.propTypes = {
  options: PropTypes.string,
};

export default function CreateBoard({options} ) {
  const { addBoards } = useRecentBoards();
  const { addBoard } = useBoards();
  const navigateTo = useNavigate();
  const [bgSelected, setBgSelected] = useState(backgroudImages[0].filename);
  const [board, setBoard] = useState("");
  const [progressButton, setProgresButton] = useState(false);

  const handleSubmit = () => {
    setProgresButton(true);
    setTimeout(async () => {
      const myBoard = await addBoard(board, bgSelected);
      if (myBoard) {
        setBoard("");
        addBoards(myBoard);
        navigateTo(`/board/${myBoard.id}`);
        setProgresButton(false);
        setBoard("");
      }
    }, 3000);
  };

  return (
    <>
      <div
        className={`absolute  w-[300px] flex flex-col items-center justify-center p-2 bg-gray-700 rounded-lg z-50  ${
          options=== "botton"
            ? "top-[-250px] left-[-350px] md:top-[-40px] sm:top-[-40px]"
            : options=== "top" &&
              "top-[50px] 2xl:left-[-1px] xl:left-[-1px] lg:left-[-1px] md:right-0 sm:right-0"
        }`}
      >
        <h3>Crear tablero</h3>
        <div
          className={`relative my-5 w-[220px] h-[120px] ${
            bgSelected.split(".").pop() !== "webp"
              ? `bg-gradient-to-r ${bgSelected}`
              : `bg-cover bg-center`
          } p-2`}
          style={
            bgSelected.split(".").pop() === "webp"
              ? { backgroundImage: `url(/bgImagePreview/${bgSelected})` }
              : null
          }
        >
          <img
            className="absolute left-0 right-0 m-auto"
            src={BoardSkeleton}
            alt="Board Skeleton"
          />
        </div>

        <p className="inline-flex items-start justify-start w-full text-left text-[14px]">
          Fondo
        </p>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {backgroudImages.map((image, index) => {
            return (
              <div key={index}>
                <button
                  onClick={() => setBgSelected(image.filename)}
                  className="hover:bg-[#ffffff5f] rounded-lg"
                >
                  <img
                    className="rounded-lg"
                    src={`/bgImagePreview/${image.filename}`}
                    alt=""
                  />
                </button>
              </div>
            );
          })}
        </div>
        <div className="grid w-full grid-cols-5 gap-2 my-2">
          {bgColors.map((color, index) => {
            return (
              <button
                onClick={() => setBgSelected(color.name)}
                key={index}
                className={`relative h-[2rem] hover:bg-[#ffffffd6] rounded-lg bg-gradient-to-r ${color.name}`}
              ></button>
            );
          })}
        </div>
        <div className="w-full">
          <p>Titulo del tablero*</p>
          <input
            className="w-full p-1 text-gray-700 border-2 rounded-sm outline-none boder-gray-700 placeholder:text-gray-700"
            type="board"
            name="board"
            aria-invalid="true"
            onChange={(event) => setBoard(event.target.value)}
          />
          <span className="text-[12px]">
            👋 Es necesario indicar el título del tablero
          </span>
          <button
            onClick={handleSubmit}
            className={`py-1 my-2 text-white ${
              board.trim() === ""
                ? "bg-[#fdfdfd78] cursor-not-allowed"
                : "bg-[#0065FF] hover:bg-[#0747A6]"
            }  transition-all duration-200 rounded-sm w-full`}
            disabled={board.trim() === "" ? true : false}
          >
            <div className="flex items-center justify-center py-1">
              {progressButton === false ? (
                <p>Crear</p>
              ) : (
                <div className="w-fit animate-spin">
                  <img
                    className={`top-0 w-[20px] h-[20px] my-1`}
                    src={load}
                    alt=""
                  />
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
