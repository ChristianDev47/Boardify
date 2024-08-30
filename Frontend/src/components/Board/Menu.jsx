import PropTypes from "prop-types";
import x from "../../assets/icons/x.svg";
import config from "../../assets/icons/config.svg";
import info from "../../assets/icons/info.svg";
import activity from "../../assets/icons/activity.svg";
import close from "../../assets/icons/close.svg";
import User from "../../assets/icons/user.svg";
import users from "../../assets/icons/users.svg";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import { useEffect, useState } from "react";
import {
  GetBoardActivity,
  GetCardActivity,
  GetCardByList,
  GetListActivity,
  GetListsByBoard,
} from "../../services/project";
import BackgroundBoard from "../Menu/Background";
import { GetUser } from "../../services/user";
import { Link, useNavigate } from "react-router-dom";
import AddPermissionsMembersModal from "../Menu/AddMembersModal";
import ChangePermissions from "../Menu/ChangePermissions";
import check from "../../assets/icons/selected.svg";
import { useBoards } from "../../hook/boards";
import toast from "react-hot-toast";
import { charValue } from "../../services/getInitialsUsers";
import { useRecentBoards } from "../../hook/board";

MenuBoard.propTypes = {
  showMenu: PropTypes.string.isRequired,
  setShowMenu: PropTypes.func.isRequired,
};

export default function MenuBoard({ showMenu, setShowMenu }) {
  const [showOptions, setShowOptions] = useState({
    show: false,
    pagination: 0,
  });
  const [activities, setActivities] = useState();
  const [admin, setAdmin] = useState();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showChangePermissions, setShowChangePermissions] = useState(false);
  const [addMemberPermissionsModal, setAddMemberPermissionsModal] =
    useState(false);
  const { myBoardInfo, updateBoards, deleteBoard } = useBoards();
  const { deleteBoards } = useRecentBoards();
  const { myBoard: board } = myBoardInfo;

  const navigateTo = useNavigate();
  useEffect(() => {
    const getActivities = async () => {
      const cards = [];
      const myActivities = [];
      const boardActivities = await GetBoardActivity({ boardId: board.id });
      for (const board of boardActivities) {
        myActivities.push(board);
      }
      const lists = await GetListsByBoard({ boardId: board.id });
      for (const list of lists) {
        const myCards = await GetCardByList({ listId: list._id });
        const listActivities = await GetListActivity({ listId: list._id });
        cards.push(...myCards);
        myActivities.push(...listActivities);
      }
      for (const card of cards) {
        const myCardActivities = await GetCardActivity({ cardId: card._id });
        myActivities.push(...myCardActivities);
      }
      setActivities(
        myActivities.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      );
    };
    Object.keys(board).length > 0 && getActivities();

    const getAdmin = async () => {
      const myuser = await GetUser({ id: board.user_id.id });
      setAdmin(myuser);
    };
    Object.keys(board).length > 0 && getAdmin();
  }, [board]);

  useEffect(() => {
    setTimeout(() => {
      setShowOptions({ show: false, pagination: 0, option: "" });
    }, 300);
  }, [showMenu]);

  useEffect(() => {
    if (showOptions.pagination === 1) {
      setShowChangePermissions(false);
    }
  }, [showOptions]);

  const AboutBoard = () => {
    return (
      <div>
        <li className="flex p-3 rounded-xl text-[17px]">
          <img className="w-[26px] h-auto mr-3" src={User} alt="" />
          Administradores del tablero
        </li>
        <div className="flex items-center justify-start gap-2 pl-2">
          {admin && admin.profile && admin.profile !== "" ? (
            <div
              className={`relative cursor-pointer w-[45px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
                !["png", "jpg", "webp"].includes(
                  admin.profile.split(".").pop().split("?")[0]
                )
                  ? `bg-[#0065FF]`
                  : `bg-cover bg-center`
              }`}
              style={
                admin.profile.split(":")[0] == "https"
                  ? { backgroundImage: `url(${admin.profile})` }
                  : null
              }
            >
              {admin.profile.split(":")[0] !== "https" &&
                charValue(admin.name, admin.surname)}
            </div>
          ) : (
            admin.name &&
            admin.surname && (
              <div className=" w-[45px] h-[45px]  bg-[#0065FF] text-[16px] font-bold rounded-full aspect-square text-white flex justify-center items-center ">
                {charValue(admin.name, admin.surname)}
              </div>
            )
          )}
          <div>
            <p>
              {admin.name} {admin.surname}
            </p>
            <p>{admin.email}</p>
          </div>
        </div>
        <li className="flex mt-6 p-3 rounded-xl text-[17px]">
          <img className="w-[26px] h-auto mr-3" src={users} alt="" />
          Miembros del tablero
        </li>
        {board.members.length > 1 ? (
          board.members.map((member) => {
            if (member.role !== "administrador") {
              return (
                <div key={member.member_id.id}>
                  <div className="flex items-center justify-start gap-2 pl-2">
                    {member.member_id &&
                    member.member_id.profile &&
                    member.member_id.profile !== "" ? (
                      <div
                        className={`relative cursor-pointer w-[45px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
                          !["png", "jpg", "webp"].includes(
                            member.member_id.profile
                              .split(".")
                              .pop()
                              .split("?")[0]
                          )
                            ? `bg-[#0065FF]`
                            : `bg-cover bg-center`
                        }`}
                        style={
                          member.member_id.profile.split(":")[0] == "https"
                            ? {
                                backgroundImage: `url(${member.member_id.profile})`,
                              }
                            : null
                        }
                      >
                        {member.member_id.profile.split(":")[0] !== "https" &&
                          charValue(
                            member.member_id.name,
                            member.member_id.surname
                          )}
                      </div>
                    ) : (
                      member.member_id.name &&
                      member.member_id.surname && (
                        <div className=" w-[45px] h-[45px]  bg-[#0065FF] text-[16px] font-bold rounded-full aspect-square text-white flex justify-center items-center ">
                          {charValue(
                            member.member_id.name,
                            member.member_id.surname
                          )}
                        </div>
                      )
                    )}
                    <div>
                      <p>
                        {member.member_id.name} {member.member_id.surname}
                      </p>
                      <p>{member.member_id.email}</p>
                    </div>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <Link to="/miespaciodetrabajo/members">
            <div className="text-[14px] py-2 px-4 hover:bg-gray-600 cursor-pointer rounded-md">
              No tienes miembros unidos a este tablero, Invita a nuevos miembros
            </div>
          </Link>
        )}
      </div>
    );
  };

  const ChangeAllowBackground = async () => {
    const updateData = { allow_background: !board.allow_background };
    updateBoards(board.id, updateData);
  };

  const Configuration = () => {
    return (
      <div className="space-y-4">
        {!showChangePermissions ? (
          <>
            <div>
              <div className="relative">
                <h3 className="my-2 ml-2 font-semibold">Permisos</h3>
                <div
                  onClick={() => setAddMemberPermissionsModal(true)}
                  className="p-2 bg-transparent rounded-lg cursor-pointer hover:bg-gray-600"
                >
                  <p>Añadir y eliminar miembros</p>
                  <p className="mt-1 text-gray-300 text-[13px]">
                    {board.board_permissions}
                  </p>
                </div>
                {addMemberPermissionsModal && (
                  <AddPermissionsMembersModal
                    setAddMemberPermissionsModal={setAddMemberPermissionsModal}
                    board={board}
                  />
                )}
              </div>
              <div
                onClick={() => {
                  setShowChangePermissions(true);
                  setShowOptions((prevState) => ({
                    ...prevState,
                    pagination: prevState.pagination + 1,
                  }));
                }}
                className="p-2 bg-transparent rounded-lg cursor-pointer hover:bg-gray-600"
              >
                <p>Editar permisos de usuario en el tablero</p>
              </div>
            </div>
            <div>
              <h3 className="my-2 ml-2 font-semibold">Portadas</h3>
              <div
                onClick={() => ChangeAllowBackground()}
                className="p-2 bg-transparent rounded-lg cursor-pointer hover:bg-gray-600"
              >
                <p className="flex items-center justify-start">
                  {board.allow_background === true
                    ? "Portadas de tarjetas habilitadas"
                    : "Mostrar portadas de tarjetas"}{" "}
                  {board.allow_background === true && (
                    <img className="w-[20px] mx-2" src={check} alt="" />
                  )}
                </p>
                <p className="text-[12px] my-1 text-gray-300">
                  Mostrar adjuntos de imagen y colores en la parte delantera de
                  las tarjetas.
                </p>
              </div>
            </div>
          </>
        ) : (
          <ChangePermissions board={board} />
        )}
      </div>
    );
  };

  const BoardActivity = () => {
    return (
      <div className="overflow-x-hidden">
        {activities &&
          activities
            .slice()
            .reverse()
            .map((myActivity) => {
              const currentDate = new Date();
              const formattedDate = new Date(myActivity.createdAt);
              const difference =
                currentDate.getDate() - formattedDate.getDate();
              let data;
              if (difference === 0) {
                data = `Hoy a las ${formattedDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`;
              } else if (difference === 1) {
                data = `Ayer a las ${formattedDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`;
              } else {
                data = `${formattedDate.getDate()} ${formattedDate.toLocaleString(
                  "en-US",
                  { month: "short" }
                )} a las ${formattedDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`;
              }
              return (
                <div
                  key={myActivity._id}
                  className="grid grid-cols-6 gap-5 mt-4"
                >
                  {myActivity.user_id &&
                  myActivity.user_id &&
                  myActivity.user_id.profile &&
                  myActivity.user_id.profile !== "" ? (
                    <div
                      title={myActivity.user_id.email}
                      className={`relative col-span-1 cursor-pointer w-[45px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
                        !["png", "jpg", "webp"].includes(
                          myActivity.user_id.profile
                            .split(".")
                            .pop()
                            .split("?")[0]
                        )
                          ? `bg-[#0065FF]`
                          : `bg-cover bg-center`
                      }`}
                      style={
                        myActivity.user_id.profile.split(":")[0] == "https"
                          ? {
                              backgroundImage: `url(${myActivity.user_id.profile})`,
                            }
                          : null
                      }
                    >
                      {myActivity.user_id.profile.split(":")[0] !== "https" &&
                        charValue(
                          myActivity.user_id.name,
                          myActivity.user_id.surname
                        )}
                    </div>
                  ) : (
                    myActivity.user_id.name &&
                    myActivity.user_id.surname && (
                      <div className=" w-[45px] h-[45px]  bg-[#0065FF] text-[16px] font-bold rounded-full aspect-square text-white flex justify-center items-center ">
                        {charValue(
                          myActivity.user_id.name,
                          myActivity.user_id.surname
                        )}
                      </div>
                    )
                  )}
                  <div className="flex flex-col text-[14px] col-span-5 overflow-hidden">
                    <p>
                      <span className="font-bold">
                        {myActivity.user_id.name} {myActivity.user_id.surname}
                      </span>{" "}
                      {myActivity.activity}
                    </p>
                    <p>{data}</p>
                  </div>
                </div>
              );
            })}
      </div>
    );
  };

  const handleDeleteBoad = () => {
    deleteBoard({ id: board.id });
    deleteBoards(board);
    setTimeout(() => {
      toast.error("Tablero eliminado!");
      navigateTo("/miespaciodetrabajo");
    }, 1000);
  };

  const Options = () => {
    return (
      <div className="relative">
        <li
          onClick={() =>
            setShowOptions({ show: true, option: "about", pagination: 1 })
          }
          className="flex p-3 rounded-xl hover:bg-[#323940] cursor-pointer text-[17px]"
        >
          <img className="w-[26px] h-auto mr-3" src={info} alt="" />
          Acerca de este tablero
        </li>
        <li
          onClick={() =>
            setShowOptions({ show: true, option: "activities", pagination: 1 })
          }
          className="flex p-3 rounded-xl hover:bg-[#323940] cursor-pointer text-[17px]"
        >
          <img className="w-[26px] h-auto mr-3" src={activity} alt="" />
          Actividad
        </li>
        <li
          onClick={() =>
            setShowOptions({ show: true, option: "config", pagination: 1 })
          }
          className="flex p-3 rounded-xl hover:bg-[#323940] cursor-pointer text-[17px]"
        >
          <img className="w-[26px] h-auto mr-3" src={config} alt="" />
          Configuración
        </li>
        <li
          onClick={() =>
            setShowOptions({ show: true, option: "background", pagination: 1 })
          }
          className="flex p-3 rounded-xl hover:bg-[#323940] cursor-pointer text-[17px]"
        >
          <div
            className={` w-[25px] h-[25px] rounded-md overflow-hidden mr-3 ${
              !["png", "jpg", "webp"].includes(
                board.background.split(".").pop().split("?")[0]
              )
                ? `bg-gradient-to-r ${board.background}`
                : `bg-cover bg-center`
            } flex justify-center items-center z-30 `}
            style={
              board.background.split("/")[0] === "local"
                ? {
                    backgroundImage: `url(/bgImagePreview/${board.background})`,
                  }
                : board.background.split(":")[0] == "https"
                ? { backgroundImage: `url(${board.background})` }
                : null
            }
          ></div>
          Cambiar fondo
        </li>
        <li
          onClick={() => setShowModalDelete(true)}
          className="flex p-3 rounded-xl hover:bg-[#323940] cursor-pointer text-[17px]"
        >
          <img className="w-[26px] h-auto mr-3" src={close} alt="" />
          Eliminar tablero
        </li>
        {showModalDelete && (
          <div
            className={`absolute top-[16rem] w-[320px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl z-40 border border-[#686868]`}
          >
            <div className="relative flex items-center justify-center">
              <h1 className="my-2 text-center">¿Deseas eliminar el tablero?</h1>
              <div
                onClick={() => setShowModalDelete(false)}
                className="absolute bg-transparent cursor-pointer right-4 top-3 hover:bg-gray-500"
              >
                {" "}
                <img className="w-[18px] h-auto" src={x} alt="" />
              </div>
            </div>
            <div className="px-3">
              <button
                onClick={() => handleDeleteBoad()}
                className="mb-4 w-full rounded-lg py-2 bg-[#d83838] hover:bg-[#e45555] mt-4"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`fixed w-[380px] h-full z-50 bg-[#282E33] top-14 right-0 transition-transform ${showMenu} duration-500 ease-in-out shadow-xl box-shadow-md text-white pb-[7.8rem]`}
    >
      <div className="relative flex items-center justify-center border-b border-gray-600">
        <h1 className="text-[20px] my-4 text-center">Menú</h1>
        <div
          onClick={() => setShowMenu("translate-x-[400px]")}
          className="absolute p-2 bg-transparent rounded-md cursor-pointer right-4 top-3.5 hover:bg-gray-500"
        >
          {" "}
          <img className="w-[18px] h-auto" src={x} alt="" />
        </div>
        {showOptions.pagination > 0 && (
          <div
            onClick={() =>
              setShowOptions((prevState) => ({
                ...prevState,
                pagination: prevState.pagination - 1,
                show: false,
              }))
            }
            className="absolute p-2 bg-transparent rounded-md cursor-pointer left-4 top-3 hover:bg-gray-500"
          >
            {" "}
            <img className="w-[21px] h-auto" src={arrowLeft} alt="" />
          </div>
        )}
      </div>
      <ul className="flex flex-col h-full p-5 overflow-auto">
        {!showOptions.show && showOptions.pagination === 0 ? (
          <Options />
        ) : showOptions.option === "about" ? (
          <AboutBoard />
        ) : showOptions.option === "activities" ? (
          <BoardActivity />
        ) : showOptions.option === "config" ? (
          <Configuration />
        ) : (
          showOptions.option === "background" && (
            <BackgroundBoard
              setShowOptions={setShowOptions}
              showOptions={showOptions}
            />
          )
        )}
      </ul>
    </div>
  );
}
