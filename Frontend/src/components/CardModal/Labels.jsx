import PropTypes from "prop-types";
import { useState } from "react";
import { GetLabelById, UpdateLabel } from "../../services/project";
import edit from "../../assets/icons/edit.svg";
import close from "../../assets/icons/x.svg";

Labels.propTypes = {
  labels: PropTypes.array.isRequired,
  setLabels: PropTypes.func.isRequired,
  setMyLabel: PropTypes.func.isRequired,
  handleNewLabel: PropTypes.func.isRequired,
  setEditModal: PropTypes.func.isRequired,
  setModalLabel: PropTypes.func.isRequired,
};

export default function Labels({
  labels,
  setLabels,
  handleNewLabel,
  setMyLabel,
  setEditModal,
  setModalLabel,
}) {
  const [listLabelModal, setListLabelModal] = useState(false);

  const handleUpdateCheck = async (e, id) => {
    const label = await UpdateLabel({
      id,
      data: { is_active: e.target.checked },
    });
    const data = labels.map((item) => {
      if (item._id === id) return { ...item, is_active: label.is_active };
      return item;
    });
    setLabels(data);
  };
  const handleGetData = async (id) => {
    const label = await GetLabelById({ id });
    setMyLabel((prevState) => ({
      ...prevState,
      id: label._id,
      name: label.name,
      background: label.background,
      color: label.color,
    }));
    setListLabelModal(false);
    setEditModal(true);
    setModalLabel(true);
  };

  return (
    <div className="flex flex-col gap-2 mb-8 ml-10">
      <h3 className=" text-[14px] col-span-5">Etiquetas</h3>
      <div className={`flex gap-2 flex-wrap overflow-hidden`}>
        {labels.map((label) => {
          if (label.is_active) {
            return (
              <p
                key={label._id}
                onClick={() => setListLabelModal(true)}
                className={`py-2 text-center rounded-md cursor-pointer w-auto px-2`}
                style={{
                  backgroundColor: label.background,
                  color: label.color,
                }}
              >
                {label.name}
              </p>
            );
          }
        })}
      </div>
      <div
        onClick={() => handleNewLabel()}
        className={`py-2 text-center rounded-md cursor-pointer bg-gray-500 hover:bg-gray-400 w-[100px]`}
      >
        {" "}
        +{" "}
      </div>
      {listLabelModal && (
        <div className="absolute top-20 left-10 w-[300px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl">
          <div className="relative flex items-center justify-center">
            <h1 className="my-3 text-center text-[14px]">Tus etiquetas</h1>
            <div
              onClick={() => setListLabelModal(false)}
              className="absolute bg-transparent cursor-pointer right-4 top-4 hover:bg-gray-500"
            >
              {" "}
              <img className="w-[18px] h-auto" src={close} alt="" />
            </div>
          </div>
          <div className="p-3">
            <div className="flex flex-col items-center justify-center">
              {labels.map((label) => {
                return (
                  <div
                    key={label._id}
                    className="flex items-center justify-between w-full"
                  >
                    <input
                      className="m-2"
                      type="checkbox"
                      name=""
                      id=""
                      checked={label.is_active ? true : false}
                      onChange={(e) => handleUpdateCheck(e, label._id)}
                    />
                    <div
                      className="w-full rounded-md mx-2 my-1 title text-[14px] flex justify-start items-center p-2 overflow-hidden"
                      style={{
                        backgroundColor: label.background,
                        color: label.color,
                      }}
                    >
                      {label.name}
                    </div>
                    <div
                      onClick={() => handleGetData(label._id)}
                      className="h-full p-2 bg-transparent rounded-md cursor-pointer right-4 top-4 hover:bg-gray-500"
                    >
                      {" "}
                      <img className="w-[20px] h-auto" src={edit} alt="" />
                    </div>
                  </div>
                );
              })}
              <button
                onClick={() => {
                  handleNewLabel();
                  setListLabelModal(false);
                }}
                className="w-full col-span-5 py-2 my-2 bg-[#636363] hover:bg-[#357fee] cursor-pointer"
              >
                Crear una nueva etiqueta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
