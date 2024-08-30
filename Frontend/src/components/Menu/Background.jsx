import PropTypes from "prop-types";
import {
  CreateBoardFiles,
  DeleteBoardFile,
  GetBoardFile,
  GetBoardFilesByBoard,
} from "../../services/project";
import { useEffect, useState } from "react";
import dots from "../../assets/icons/dots.svg";
import close from "../../assets/icons/x.svg";
import { useBoards } from "../../hook/boards";

BackgroundBoard.propTypes = {
  setShowOptions: PropTypes.func.isRequired,
  showOptions: PropTypes.object.isRequired,
};

const allowedFileTypes = ["image/jpeg", "image/png", "image/webp"];

export default function BackgroundBoard({ setShowOptions, showOptions }) {
  const { myBoardInfo, updateBoards } = useBoards();
  const { myBoard: board } = myBoardInfo;
  const [boardFiles, setBoardFiles] = useState([]);
  const [filesWithData, setFilesWithData] = useState([]);
  const [showBgOptions, setBgShowOptions] = useState(false);
  const [showBgColors, setShowBgColors] = useState(false);
  const [showBgImages, setShowBgImages] = useState(false);
  const [idFile, setIdFile] = useState("");

  useEffect(() => {
    const getBoardFiles = async () => {
      const boardFiles = await GetBoardFilesByBoard({ boardId: board.id });
      setBoardFiles(boardFiles);
    };
    getBoardFiles();
  }, [board.id]);

  useEffect(() => {
    const fetchData = async () => {
      const filesData = await Promise.all(
        boardFiles.map(async (file) => {
          const { _id, location, filename, createdAt } = file;
          const fileData = await GetBoardFile(location);
          return { _id, location, filename, fileData, createdAt };
        })
      );
      setFilesWithData(filesData);
    };

    boardFiles && fetchData();
  }, [boardFiles]);

  useEffect(() => {
    if (showOptions.pagination === 1) {
      setShowBgColors(false);
      setShowBgImages(false);
    }
  }, [showOptions, showBgColors, showBgImages]);

  const handleSavefile = async (event) => {
    const file = event.target.files[0];
    if (file && allowedFileTypes.includes(file.type)) {
      const formData = new FormData();
      formData.append("filename", file.name);
      formData.append("location", file);
      formData.append("board_id", board.id);
      const newBoardFile = await CreateBoardFiles(formData);
      setBoardFiles((prevState) => [...prevState, newBoardFile]);
      const newData = { background: newBoardFile.location };
      updateBoards(board.id, newData);
    } else {
      console.error(
        "Invalid file type. Please select a valid file type: JPG, PNG, WEBP, PDF, TXT, DOCX, XLSX, or PPTX."
      );
    }
  };

  const handleChangeBackground = async (location) => {
    const newData = { background: location };
    updateBoards(board.id, newData);
  };

  const handleShowOptions = (id) => {
    setBgShowOptions(true);
    setIdFile(id);
  };

  const bgColors = [
    { name: "from-blue-600 to-violet-600" },
    { name: "from-red-500 to-orange-500" },
    { name: "from-emerald-500 to-lime-600" },
    { name: "from-fuchsia-600 to-pink-600" },
    { name: "from-gray-900 to-gray-600" },
    { name: "from-cyan-500 to-sky-500" },
    { name: "from-purple-500 to-indigo-500" },
    { name: "from-amber-500 to-yellow-500" },
    { name: "from-green-500 to-teal-500" },
    { name: "from-rose-500 to-yellow-500" },
  ];

  const bgImages = [
    { filename: "local/bg1.webp" },
    { filename: "local/bg2.webp" },
    { filename: "local/bg3.webp" },
    { filename: "local/bg4.webp" },
  ];
  const handleDeleteBackground = async (id, location) => {
    await DeleteBoardFile({ id });
    const newDataFile = boardFiles.filter((file) => file._id !== id);
    if (board.background === location) {
      const randomIndex = Math.floor(Math.random() * bgColors.length);
      const newData = { background: bgColors[randomIndex].name };
      updateBoards(board.id, newData);
    }
    setBoardFiles(newDataFile);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {!showBgColors && !showBgImages ? (
        <>
          <div
            onClick={() => {
              setShowBgImages(true);
              setShowOptions((prevState) => ({
                ...prevState,
                pagination: prevState.pagination + 1,
              }));
            }}
            className="w-full h-[100px] rounded-lg bg-repeat bg-cover cursor-pointer"
            style={{
              backgroundImage: "url(/bgImagePreview/backgroundPreview.png)",
            }}
          >
            <div className="w-full h-full hover:bg-[#0000003a]"></div>
          </div>
          <div
            onClick={() => {
              setShowBgColors(true);
              setShowOptions((prevState) => ({
                ...prevState,
                pagination: prevState.pagination + 1,
              }));
            }}
            className="w-full h-[100px] rounded-lg bg-cover cursor-pointer"
            style={{ backgroundImage: "url(/bgImagePreview/colorPreview.png)" }}
          >
            <div className="w-full h-full hover:bg-[#0000003a]"></div>
          </div>
          <div className="flex flex-col items-start justify-center col-span-2 space-y-2 text-center">
            <p>Personalizar</p>
            <input
              type="file"
              id="inputFile"
              className="hidden"
              onChange={(e) => handleSavefile(e)}
            />
            <label
              htmlFor="inputFile"
              className="w-full h-full bg-gray-500 hover:bg-[#0000003a] text-[40px] rounded-lg cursor-pointer"
            >
              +
            </label>
          </div>
          {/* Images */}
          {filesWithData &&
            filesWithData.map((file, index) => {
              return (
                <div key={file._id} className="relative">
                  {idFile === file._id && showBgOptions === true && (
                    <div
                      className={`absolute top-[-8rem] ${
                        index % 2 == 0 ? "left-[0px]" : "left-[-167.5px]"
                      } w-[320px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl z-40 border border-[#686868]`}
                    >
                      <div className="relative flex items-center justify-center">
                        <h1 className="my-2 text-center">
                          Opciones del tablero
                        </h1>
                        <div
                          onClick={() => setBgShowOptions(false)}
                          className="absolute bg-transparent cursor-pointer right-4 top-3 hover:bg-gray-500"
                        >
                          {" "}
                          <img className="w-[18px] h-auto" src={close} alt="" />
                        </div>
                      </div>
                      <div className="px-3">
                        <button
                          onClick={() =>
                            handleDeleteBackground(file._id, file.location)
                          }
                          className="mb-4 w-full rounded-lg py-2 bg-[#686868] hover:bg-[#959595] mt-4"
                        >
                          Eliminar fondo
                        </button>
                      </div>
                    </div>
                  )}
                  <div
                    onClick={() => handleChangeBackground(file.location)}
                    className="relative group w-full h-[100px] rounded-lg bg-cover cursor-pointer"
                    style={{ backgroundImage: `url(${file.location})` }}
                  >
                    <div className="w-full h-full hover:bg-[#0000003a]"></div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowOptions(file._id);
                      }}
                      className="absolute p-1 bg-[#8a8a8ac4] rounded-lg top-2 right-2 cursor-pointer hidden group-hover:block"
                    >
                      <img className="w-[24px]" src={dots} alt="" />
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      ) : showBgImages ? (
        <>
          {bgImages.map((image, index) => {
            return (
              <div
                key={index}
                onClick={() => handleChangeBackground(image.filename)}
                className="w-full h-[100px] rounded-lg bg-repeat bg-cover cursor-pointer"
                style={{
                  backgroundImage: `url(/bgImagePreview/${image.filename}`,
                }}
              >
                <div className="w-full h-full hover:bg-[#0000003a]"></div>
              </div>
            );
          })}
        </>
      ) : (
        showBgColors && (
          <>
            {bgColors.map((image, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleChangeBackground(image.name)}
                  className={`w-full h-[100px] rounded-lg bg-gradient-to-r ${image.name} cursor-pointer`}
                >
                  <div className="w-full h-full hover:bg-[#0000003a]"></div>
                </div>
              );
            })}
          </>
        )
      )}
    </div>
  );
}
