import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../hook/useAuth";
import toast from "react-hot-toast";
import { Logout } from "../../services/user";
import { charValue } from "../../services/getInitialsUsers";
import { useRecentBoards } from "../../hook/board";

ModalUserOptions.propTypes = {
  myUser: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default function ModalUserOptions({ myUser, closeModal }) {
  const { logout } = useAuth();
  const { clearBoards } = useRecentBoards();
  const navigateTo = useNavigate();

  const userLogout = () => {
    const myUserLogout = async () => {
      await Logout();
      clearBoards();
      closeModal
    };
    const logoutWithToast = () => {
      toast.promise(
        myUserLogout().then(() => {
          logout();
          navigateTo("/");
        }),
        {
          loading: "Cerrando sesión...",
          success: "¡Sesión cerrada exitosamente!",
          error: "Error al cerrar sesión",
        },
        {
          duration: 6000,
        }
      );
    };

    logoutWithToast();
  };
  return (
    <div className="absolute top-12 right-0  w-[350px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl text-white">
      <div className="py-5">
        <div className="px-5">
          <h3>CUENTA</h3>
          <div className="flex items-center justify-start py-3 border-b border-gray-50">
            {myUser && myUser.profile && myUser.profile !== "" ? (
              <div
                className={`relative cursor-pointer w-[45px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
                  !["png", "jpg", "webp"].includes(
                    myUser.profile.split(".").pop().split("?")[0]
                  )
                    ? `bg-[#0065FF]`
                    : `bg-cover bg-center`
                }`}
                style={
                  myUser.profile.split(":")[0] == "https"
                    ? { backgroundImage: `url(${myUser.profile})` }
                    : null
                }
              >
                {myUser.profile.split(":")[0] !== "https" &&
                  charValue(myUser.name, myUser.surname)}
              </div>
            ) : (
              myUser.name &&
              myUser.surname && (
                <div className=" w-[45px] h-[45px]  bg-[#0065FF] text-[16px] font-bold rounded-full aspect-square text-white flex justify-center items-center ">
                  {charValue(myUser.name, myUser.surname)}
                </div>
              )
            )}
            <div className="mx-2 text-[16px]">
              <p>
                {myUser.name} {myUser.surname}
              </p>
              <p className="text-[14px] text-gray-300 ">{myUser.email}</p>
            </div>
          </div>
        </div>
        <ul className="mt-3">
          <Link onClick={closeModal} to="/user/account">
            <li className="px-5 py-3 cursor-pointer hover:bg-gray-500">
              Perfil y visibilidad
            </li>
          </Link>
          <Link onClick={closeModal} to="/user/account/configuration">
            <li className="px-5 py-3 cursor-pointer hover:bg-gray-500">
              Ajustes
            </li>
          </Link>
          <li
            onClick={() => userLogout()}
            className="px-5 py-3 cursor-pointer hover:bg-gray-500"
          >
            Cerrar sesión
          </li>
        </ul>
      </div>
    </div>
  );
}
