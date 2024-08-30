import PropTypes from "prop-types";
import close from "../../assets/icons/x.svg";
import check from "../../assets/icons/selected.svg";
import { useBoards } from "../../hook/boards";

AddPermissionsMembersModal.propTypes = {
  setAddMemberPermissionsModal: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired,
};

export default function AddPermissionsMembersModal({
  setAddMemberPermissionsModal,
  board,
}) {
  const { updateBoards } = useBoards();

  const handleChangePermissions = async (permission) => {
    await updateBoards(board.id, { board_permissions: permission });
    setAddMemberPermissionsModal(false);
  };

  return (
    <div className="absolute top-20 left-0 w-[340px] h-auto bg-[#2d2d2d] rounded-md shadow-2xl">
      <div className="relative flex items-center justify-center">
        <h1 className="mt-3 text-center">Añadir/Eliminar miembros</h1>
        <div
          onClick={() => setAddMemberPermissionsModal(false)}
          className="absolute bg-transparent cursor-pointer right-4 top-4 hover:bg-gray-500"
        >
          {" "}
          <img className="w-[18px] h-auto" src={close} alt="" />
        </div>
      </div>
      <div className="py-4">
        <div
          onClick={() => handleChangePermissions("Administradores")}
          className="px-4 py-2 cursor-pointer hover:bg-gray-600"
        >
          <div className="flex items-center justify-start">
            Administradores{" "}
            {board.board_permissions === "Administradores" && (
              <img className="w-[20px] mx-2" src={check} alt="" />
            )}
          </div>
          <p className="text-[12px] my-1 text-gray-300">
            Permitir solo a los administradires añadir y eliminar a otros
            miembros de este tablero.
          </p>
        </div>
        <div
          onClick={() => handleChangePermissions("Miembros")}
          className="px-4 py-2 cursor-pointer hover:bg-gray-600"
        >
          <div className="flex items-center justify-start">
            Todos los miembros{" "}
            {board.board_permissions === "Miembros" && (
              <img className="w-[20px] mx-2" src={check} alt="" />
            )}{" "}
          </div>
          <p className="text-[12px] my-1 text-gray-300">
            Permitir a los miembros y administradores añadir y eliminar a otros
            miembros de este tablero.
          </p>
        </div>
      </div>
    </div>
  );
}
