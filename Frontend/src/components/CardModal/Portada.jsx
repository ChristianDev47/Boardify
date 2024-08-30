import PropTypes from "prop-types";
import close from "../../assets/icons/x.svg";
import { CreateCardFiles } from "../../services/project";
import { useEffect, useState } from "react";
import { useCard } from "../../hook/card";

CreatePortadaComponent.propTypes = {
  myCard: PropTypes.object.isRequired,
  setMyCard: PropTypes.func.isRequired,
  setBackgroundModal: PropTypes.func.isRequired,
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

const colorsArray = [
  "#216E4E",
  "#7F5F01",
  "#A54800",
  "#AE2E24",
  "#5E4DB2",
  "#0055CC",
  "#206A83",
  "#4C6B1F",
  "#943D73",
  "#596773",
];
const allowedFileTypes = ["image/jpeg", "image/png", "image/webp"];

export default function CreatePortadaComponent({
  myCard,
  setMyCard,
  setCardFiles,
  setBackgroundModal,
  cardFiles,
}) {
  const [filesWithData, setFilesWithData] = useState([]);
  const { updateCard, updateAllCardData } = useCard();

  useEffect(() => {
    const fetchData = async () => {
      const filesData = await Promise.all(
        cardFiles.map(async (file) => {
          const { _id, location, filename, createdAt } = file;
          const fileData = location;
          return { _id, location, filename, fileData, createdAt };
        })
      );
      setFilesWithData(filesData);
    };

    fetchData();
  }, [cardFiles]);

  const UpdateCardBackground = async ({ background }) => {
    await updateCard(myCard._id, { background });
    await updateAllCardData({ ...myCard, background });
    setMyCard({ ...myCard, background });
  };

  const handleSavefile = async (event) => {
    const file = event.target.files[0];
    if (file && allowedFileTypes.includes(file.type)) {
      const formData = new FormData();
      formData.append("filename", file.name);
      formData.append("location", file);
      formData.append("card_id", myCard._id);
      const newCardFile = await CreateCardFiles(formData);
      await UpdateCardBackground({ background: newCardFile.location });
      setCardFiles((prevState) => [...prevState, newCardFile]);
    } else {
      console.error(
        "Invalid file type. Please select a valid file type: JPG, PNG, WEBP, PDF, TXT, DOCX, XLSX, or PPTX."
      );
    }
  };

  const handleDeleteFile = async () => {
    await updateCard(myCard._id, { background: null });
    setMyCard({ ...myCard, background: null });
    await updateAllCardData({ ...myCard, background: null });
  };

  return (
    <div className="absolute 2xl:top-28 xl:top-28 lg:top-28 md:bottom-0 sm:bottom-0 2xl:left-0 xl:left-0 lg:left-0 md:right-0 sm:right-0 w-[300px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl">
      <div className="relative flex items-center justify-center">
        <h1 className="my-4 text-center">Personaliza tu portada</h1>
        <div
          onClick={() => setBackgroundModal(false)}
          className="absolute bg-transparent cursor-pointer right-4 top-4 hover:bg-gray-500"
        >
          {" "}
          <img className="w-[18px] h-auto" src={close} alt="" />
        </div>
      </div>
      <div className="p-3">
        <p>Colores</p>
        <div className="grid grid-cols-5 gap-2 my-2">
          {colorsArray.map((color, index) => {
            return (
              <div
                onClick={() => UpdateCardBackground({ background: color })}
                key={index}
                className={`w-full h-8 cursor-pointer rounded-sm border-2 border-transparent `}
                style={{ backgroundColor: color }}
              ></div>
            );
          })}
        </div>
        <p className="mt-7">Imagenes</p>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {filesWithData.map((image, index) => {
            const ext = image.location.split(".").pop().split("?")[0];
            if (["jpg", "png", "webp"].includes(ext)) {
              return (
                <div key={index}>
                  <button
                    onClick={() =>
                      UpdateCardBackground({ background: image.location })
                    }
                    className="hover:bg-[#ffffff5f] rounded-sm"
                  >
                    <img
                      className="rounded-sm"
                      src={`${image.fileData}`}
                      alt=""
                    />
                  </button>
                </div>
              );
            }
          })}
        </div>
        <input
          type="file"
          id="inputFile"
          className="hidden"
          onChange={(e) => handleSavefile(e)}
        />
        <label
          htmlFor="inputFile"
          className="block w-full px-4 py-2 mt-1 text-center text-white bg-blue-500 rounded-md cursor-pointer"
        >
          Cargar una imagen como portada
        </label>
        <button
          onClick={() => handleDeleteFile()}
          className="w-full p-2 my-2 bg-gray-600 rounded-sm"
        >
          Quitar portada
        </button>
      </div>
    </div>
  );
}
