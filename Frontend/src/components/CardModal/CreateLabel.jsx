import PropTypes from "prop-types";
import { CreateLabel, DeleteLabel, UpdateLabel } from "../../services/project";
import close from "../../assets/icons/x.svg";
import { useCard } from "../../hook/card";
import { colorsArray } from "../../services/colors";

CreateLabelComponent.propTypes = {
  setModalLabel: PropTypes.func.isRequired,
  setMyLabel: PropTypes.func.isRequired,
  setLabels: PropTypes.func.isRequired,
  myLabel: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
  editModal: PropTypes.bool.isRequired,
};

export default function CreateLabelComponent({
  setModalLabel,
  setMyLabel,
  myLabel,
  editModal,
  labels,
  setLabels,
}) {
  const { cardsAllData } = useCard();
  const { myCard } = cardsAllData;
  const handleCreateCard = () => {
    if (myLabel.name.trim() !== "") {
      const createLabel = async () => {
        let newLabel;
        if (myLabel.id.trim() === "") {
          newLabel = await CreateLabel({
            label: {
              name: myLabel.name,
              background: myLabel.background,
              color: myLabel.color,
              card_id: myCard._id,
              is_active: true,
            },
          });
          setLabels((prevState) => [...prevState, newLabel]);
        } else {
          newLabel = await UpdateLabel({
            id: myLabel.id,
            data: {
              name: myLabel.name,
              background: myLabel.background,
              color: myLabel.color,
            },
          });
          const newData = labels.map((label) => {
            if (label._id === myLabel.id) return newLabel;
            return label;
          });
          setMyLabel((prevState) => ({ ...prevState, id: "" }));
          setLabels(newData);
        }
        setModalLabel(false);
      };
      createLabel();
    }
  };
  const handleDeleteLabel = async () => {
    await DeleteLabel({ id: myLabel.id });
    const newData = labels.filter((label) => label._id !== myLabel.id);
    setLabels(newData);
    setModalLabel(false);
    setMyLabel((prevState) => ({ ...prevState, id: "" }));
  };

  return (
    <div className="absolute 2xl:top-28 xl:top-28 lg:top-28 md:bottom-0 sm:bottom-0 2xl:left-0 xl:left-0 lg:left-0 md:right-0 sm:right-0 w-[300px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl z-[100]">
      <div className="relative flex items-center justify-center">
        <h1 className="my-4 text-center">Crear una etiqueta</h1>
        <div
          onClick={() => {
            setModalLabel(false);
            setMyLabel((prevState) => ({ ...prevState, id: "" }));
          }}
          className="absolute bg-transparent cursor-pointer right-4 top-4 hover:bg-gray-500"
        >
          {" "}
          <img className="w-[18px] h-auto" src={close} alt="" />
        </div>
      </div>
      <div className="bg-gray-800 w-full h-[100px] p-4">
        <div
          className="w-[90%] h-[50%] rounded-md m-4 title text-[14px] flex justify-start items-center px-2 overflow-hidden"
          style={{ backgroundColor: myLabel.background, color: myLabel.color }}
        >
          {myLabel.name}
        </div>
      </div>
      <div className="p-3">
        <p>Titulo</p>
        <input
          type="text"
          className="w-full p-2 bg-gray-700 border-gray-400 outline-none bottom-2"
          value={myLabel.name}
          onChange={(e) =>
            setMyLabel((prevState) => ({ ...prevState, name: e.target.value }))
          }
        />
        <p>Selecciona un color</p>
        <div className="grid grid-cols-5 gap-2">
          {colorsArray.map((color, index) => {
            return (
              <div
                onClick={() => {
                  setMyLabel((prevState) => ({
                    ...prevState,
                    background: color,
                    color:
                      (index >= 10 && index < 15) ||
                      (index >= 25 && index <= 30)
                        ? "#000000"
                        : "#FFFFFF",
                  }));
                }}
                key={index}
                className={`w-full h-8 cursor-pointer rounded-sm border-2 border-transparent ${
                  color === myLabel.background && "border-[#0065FF]"
                }`}
                style={{ backgroundColor: color }}
              ></div>
            );
          })}
          <button
            onClick={() => {
              setMyLabel((prevState) => ({
                ...prevState,
                background: "#21272C",
                color: "#FFFFFF",
              }));
            }}
            className="col-span-5 py-2 bg-gray-600 hover:bg-gray-500"
          >
            Quitar Color
          </button>
          <div className="flex items-center justify-between col-span-5 space-x-2">
            <button
              onClick={handleCreateCard}
              className=" w-full py-2 bg-[#0065FF] hover:bg-[#357fee]"
              disabled={myLabel.name.trim() === "" ? true : false}
            >
              {editModal ? "Guardar" : "Crear"}
            </button>
            {editModal && (
              <button
                onClick={() => handleDeleteLabel()}
                className=" w-full py-2 bg-[#ff0000] hover:bg-[#ee3535]"
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
