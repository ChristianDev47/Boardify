import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import fileIcon from "../../assets/icons/file.svg";
import close from "../../assets/icons/x.svg";
import { DeleteCardFile, UpdateCardFile } from "../../services/project";

CardFile.propTypes = {
  cardFiles: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      filename: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCardFiles: PropTypes.func.isRequired,
};

export default function CardFile({ cardFiles, setCardFiles }) {
  const downloadRef = useRef(null);
  const [filesWithData, setFilesWithData] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [myCardFile, setMyCardFile] = useState({ id: "", filename: "" });

  useEffect(() => {
    const fetchData = async () => {
      const filesData = await Promise.all(
        cardFiles.map(async (file) => {
          const { _id, location, filename, createdAt } = file;
          const fileData = file.location;
          return { _id, location, filename, fileData, createdAt };
        })
      );
      setFilesWithData(filesData);
    };

    fetchData();
  }, [cardFiles]);

  const downloadFile = (fileData, filename, ext) => {
    const a = document.createElement("a");
    a.href = fileData;
    a.download = `${filename}.${ext}`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUpdate = (file) => {
    setMyCardFile((prevState) => ({
      ...prevState,
      id: file._id,
      filename: file.filename,
    }));
    setShowUpdateModal(true);
    setShowDeleteModal(false);
  };
  const handleDelete = (id) => {
    setMyCardFile((prevState) => ({ ...prevState, id }));
    setShowDeleteModal(true);
    setShowUpdateModal(false);
  };

  const handleUpdateFile = async (id) => {
    const newData = await UpdateCardFile({
      id,
      data: { filename: myCardFile.filename },
    });
    const newCardFileData = cardFiles.map((cardFile) => {
      if (cardFile._id === id) return newData;
      return cardFile;
    });
    setCardFiles(newCardFileData);
    setShowUpdateModal(false);
  };

  const handleDeleteFile = async (id) => {
    await DeleteCardFile({ id });
    const newCardFileData = cardFiles.filter((cardFile) => cardFile._id !== id);
    setCardFiles(newCardFileData);
    setShowDeleteModal(false);
  };

  const formatDate = (date) => {
    const currentDate = new Date();
    const previousTime = new Date(date);
    const formattedDate = new Date(date);
    const difference = currentDate.getDate() - formattedDate.getDate();
    const time = formattedDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const differenceTime = Math.round(
      (currentDate - previousTime) / (1000 * 60 * 60)
    );
    const differenceInMinutes = Math.floor(
      (currentDate - previousTime) / (1000 * 60)
    );

    if (difference === 0) {
      if (differenceTime === 0) {
        if (differenceInMinutes === 0) {
          return "Añadido hace poco";
        } else if (differenceInMinutes === 1) {
          return "Añadido hace un minuto";
        } else {
          return `Añadido hace ${differenceInMinutes} minutos`;
        }
      } else {
        return `Añadido hace ${differenceTime} horas`;
      }
    } else if (difference === 1) {
      return `Añadido ayer a las ${time}`;
    } else {
      return `Añadido el ${formattedDate.getDate()} ${formattedDate.toLocaleString(
        "es",
        { month: "short" }
      )}. a las ${time}`;
    }
  };

  return (
    <div className="grid grid-cols-5 gap-2 mb-8">
      <div className="flex col-span-5 mt-6 mb-2">
        <img className="w-[24px] h-auto mr-6" src={fileIcon} alt="" />
        <h3 className="font-semibold">Adjuntos</h3>
      </div>
      <div className="col-span-5 space-y-3">
        {filesWithData
          .slice()
          .reverse()
          .map((file, index) => {
            const ext = file.location.split(".").pop().split("?")[0];
            return (
              <div
                key={index}
                className="flex items-center justify-start w-full p-2 space-x-4 rounded-sm cursor-pointer hover:bg-gray-700"
              >
                {["jpg", "png", "webp"].includes(ext) ? (
                  <img
                    className="w-[150px] rounded-sm"
                    src={`${file.fileData}`}
                    alt=""
                  />
                ) : (
                  <div className="w-[150px] h-[85px] rounded-sm flex justify-center items-center bg-gray-600 text-[20px] font-bold">
                    {ext}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{file.filename}</p>
                  <p>{formatDate(file.createdAt)}</p>
                  <div className="flex space-x-4">
                    <div
                      onClick={() =>
                        downloadFile(file.fileData, file.filename, ext)
                      }
                      className="underline cursor-pointer"
                    >
                      Descargar
                    </div>
                    <div
                      onClick={() => handleUpdate(file)}
                      className="relative underline cursor-pointer"
                    >
                      Editar
                      {showUpdateModal === true &&
                        myCardFile.id === file._id && (
                          <div className="absolute top-6 left-[-6rem] w-[390px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl z-50">
                            <div className="relative flex items-center justify-center">
                              <h1 className="my-4 text-center">
                                Editar archivo
                              </h1>
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowUpdateModal(false);
                                }}
                                className="absolute bg-transparent cursor-pointer right-4 top-4 hover:bg-gray-500"
                              >
                                <img
                                  className="w-[18px] h-auto"
                                  src={close}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="p-3">
                              <p>Nombre del archivo</p>
                              <input
                                type="text"
                                className="w-full p-2 bg-gray-700 border-gray-400 outline-none bottom-2"
                                value={myCardFile.filename}
                                onChange={(e) =>
                                  setMyCardFile((prevState) => ({
                                    ...prevState,
                                    filename: e.target.value,
                                  }))
                                }
                              />
                              <button
                                onClick={() => handleUpdateFile(file._id)}
                                className=" w-full py-2 bg-[#0065FF] hover:bg-[#357fee] mt-4"
                                disabled={
                                  myCardFile.filename.trim() === ""
                                    ? true
                                    : false
                                }
                              >
                                Guardar
                              </button>
                            </div>
                          </div>
                        )}
                    </div>
                    <div
                      onClick={() => handleDelete(file._id)}
                      className="relative underline cursor-pointer"
                    >
                      Eliminar
                      {showDeleteModal === true &&
                        myCardFile.id === file._id && (
                          <div className="absolute top-6 left-[-6rem] w-[390px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl z-50">
                            <div className="relative flex items-center justify-center">
                              <h1 className="my-4 text-center">
                                ¿Desea eliminar el archivo?
                              </h1>
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowDeleteModal(false);
                                }}
                                className="absolute bg-transparent cursor-pointer right-4 top-4 hover:bg-gray-500"
                              >
                                <img
                                  className="w-[18px] h-auto"
                                  src={close}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="p-3">
                              <p>
                                La operación de eliminar un archivo es
                                permanente. No es posible deshacer la operación.
                              </p>
                              <button
                                onClick={() => handleDeleteFile(file._id)}
                                className=" w-full py-2 bg-[#e85d5d] hover:bg-[#ff7979] mt-4"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <a ref={downloadRef} style={{ display: "none" }} />
    </div>
  );
}
