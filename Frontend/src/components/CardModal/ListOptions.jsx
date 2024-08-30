import PropTypes from "prop-types";
import { useList } from "../../hook/lists";

ListOptions.propTypes = {
  listId: PropTypes.string.isRequired,
};

export default function ListOptions({ listId }) {
  const { deleteList } = useList();
  const handleDeleteList = async () => {
    deleteList(listId);
  };

  return (
    <div className="absolute top-8 right-[-16rem] w-[300px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl z-50">
      <div className="relative flex items-center justify-center">
        <h1 className="mt-4 mb-2 text-center">Opciones</h1>
      </div>
      <div className="p-3">
        <button
          onClick={() => handleDeleteList()}
          className="w-full p-2 bg-gray-600 rounded-md text-start hover:bg-gray-500"
        >
          Eliminar Lista
        </button>
      </div>
    </div>
  );
}
