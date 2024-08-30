import CheckIcon from "../../assets/icons/checkItem.svg";
import PropTypes from "prop-types";
import {
  DeleteCheckItem,
  GetCheckItemById,
  UpdateCheckItem,
} from "../../services/project";
import { useEffect, useState } from "react";
import Delete from "../../assets/icons/delete.svg";

CheckItems.propTypes = {
  checkItems: PropTypes.array.isRequired,
  setCheckItems: PropTypes.func.isRequired,
  setCheckListModal: PropTypes.func.isRequired,
};

export default function CheckItems({
  checkItems,
  setCheckItems,
  setCheckListModal,
}) {
  const [progressBar, setProgressBar] = useState(0);
  const [showEditor, setShowEditor] = useState(false);
  const [myCheckItem, setMyCheckItem] = useState({
    id: "",
    title: "",
    is_checked: true,
  });

  useEffect(() => {
    let checkedCount = 0;
    checkItems.forEach((item) => {
      if (item.is_checked) {
        checkedCount++;
      }
    });
    const percent = (checkedCount / checkItems.length) * 100;
    setProgressBar(Math.round(percent));
  }, [checkItems]);

  const handleUpdateCheck = async (e, id) => {
    const checkItem = await UpdateCheckItem({
      id,
      data: { is_checked: e.target.checked },
    });
    const data = checkItems.map((item) => {
      if (item._id === id) return { ...item, is_checked: checkItem.is_checked };
      return item;
    });
    setCheckItems(data);
  };

  const handleShowEditor = async (id) => {
    const myItem = await GetCheckItemById({ id });
    setMyCheckItem({ id, title: myItem.title, is_checked: myItem.is_checked });
    setShowEditor(true);
  };

  const handleUpdateCheckItem = async (id) => {
    const newData = await UpdateCheckItem({
      id,
      data: { title: myCheckItem.title },
    });
    const updateItems = checkItems.map((item) => {
      if (item._id === id) return newData;
      return item;
    });
    setCheckItems(updateItems);
    setShowEditor(false);
  };

  const handleDelete = async (id) => {
    await DeleteCheckItem({ id });
    const newCheckItems = checkItems.filter((item) => item._id !== id);
    setCheckItems(newCheckItems);
  };

  return (
    <div className="w-full mb-8">
      <div className="flex my-4">
        <img className="w-[26px] h-auto mr-4" src={CheckIcon} alt="" />
        <h3 className="font-semibold">CheckList</h3>
      </div>
      <div className="flex items-center justify-between">
        <p>{progressBar}%</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ml-4">
          <div
            className={`bg-blue-600 h-2.5 rounded-full transition-all duration-500`}
            style={{ width: `${progressBar}%` }}
          ></div>
        </div>
      </div>
      <div>
        {checkItems &&
          checkItems.map((item) => {
            return (
              <div
                key={item._id}
                className="flex items-start justify-start my-1 space-x-4"
              >
                <input
                  className="w-[24px] h-[24px] mt-2 cursor-pointer"
                  type="checkbox"
                  name=""
                  id=""
                  checked={item.is_checked}
                  onChange={(e) => handleUpdateCheck(e, item._id)}
                />
                {showEditor && myCheckItem.id === item._id ? (
                  <div className="flex flex-col items-start justify-start p-2 bg-gray-600 rounded-lg">
                    <textarea
                      className="w-full p-2 mt-2 bg-gray-800 border-2 border-blue-500 rounded-md outline-none"
                      name=""
                      id=""
                      cols="50"
                      rows="2"
                      value={myCheckItem.title}
                      onChange={(e) =>
                        setMyCheckItem((prevState) => ({
                          ...prevState,
                          title: e.target.value,
                        }))
                      }
                    ></textarea>
                    <div className="flex justify-start w-full mt-2 space-x-2">
                      <button
                        onClick={() => handleUpdateCheckItem(item._id)}
                        className="p-2 bg-blue-600 rounded-md"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setShowEditor(false)}
                        className="p-2 bg-gray-500 rounded-md"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => handleShowEditor(item._id)}
                    className={` hover:bg-gray-500 rounded-md cursor-pointer w-full p-2 flex justify-between items-center group overflow-hidden`}
                  >
                    <p
                      className={`${item.is_checked && "line-through"} w-[90%]`}
                    >
                      {item.title}
                    </p>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="hidden group-hover:block"
                    >
                      <img className="h-auto w-[20px]" src={Delete} alt="" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        <button
          onClick={() => setCheckListModal(true)}
          className="px-4 py-2 mx-12 my-2 bg-gray-500 rounded-md hover:bg-gray-600"
        >
          Añadir un elemento
        </button>
      </div>
    </div>
  );
}
