import PropTypes from "prop-types";
import { CreateCheckItem } from "../../services/project";
import close from "../../assets/icons/x.svg";
import { useState } from "react";

CreateCheckItemComponent.propTypes = {
  setCheckListModal: PropTypes.func.isRequired,
  setCheckItems: PropTypes.func.isRequired,
  myCard: PropTypes.object.isRequired,
};

export default function CreateCheckItemComponent({
  setCheckListModal,
  setCheckItems,
  myCard,
}) {
  const [checkTitle, setCheckTitle] = useState("");

  const handleCreateCard = async () => {
    if (checkTitle.trim() !== "") {
      const newCheckItem = await CreateCheckItem({
        checkItem: {
          title: checkTitle,
          is_checked: false,
          card_id: myCard._id,
        },
      });
      setCheckItems((prevState) => [...prevState, newCheckItem]);
      setCheckListModal(false);
    }
  };

  return (
    <div className="absolute 2xl:top-28 xl:top-28 lg:top-28 md:bottom-0 sm:bottom-0 2xl:left-0 xl:left-0 lg:left-0 md:right-0 sm:right-0 w-[300px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl">
      <div className="relative flex items-center justify-center">
        <h1 className="my-4 text-center">Crear un item</h1>
        <div
          onClick={() => setCheckListModal(false)}
          className="absolute bg-transparent cursor-pointer right-4 top-4 hover:bg-gray-500"
        >
          {" "}
          <img className="w-[18px] h-auto" src={close} alt="" />
        </div>
      </div>
      <div className="p-3">
        <p>Titulo</p>
        <input
          type="text"
          className="w-full p-2 bg-gray-700 border-gray-400 outline-none bottom-2"
          value={checkTitle}
          onChange={(e) => setCheckTitle(e.target.value)}
        />
        <button
          onClick={handleCreateCard}
          className=" w-full py-2 bg-[#0065FF] cursor-pointer hover:bg-[#357fee] mt-4"
          disabled={checkTitle.trim() === "" ? true : false}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
