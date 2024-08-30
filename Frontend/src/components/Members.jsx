/* eslint-disable react-hooks/exhaustive-deps */
import link from "../assets/icons/link.svg";
import users from "../assets/icons/users.svg";
import close from "../assets/icons/x.svg";
import { useEffect, useState } from "react";
import { CreateInvitation, GetBoardById } from "../services/project";
import { useAuth } from "../hook/useAuth";
import { Link } from "react-router-dom";
import { useBoards } from "../hook/boards";
import toast from "react-hot-toast";
import { GetUser } from "../services/user";
import { charValue } from "../services/getInitialsUsers";
export default function Members() {
  const { user } = useAuth();
  const {
    getColaborativeBoards,
    myBoardInfo,
    deleteMemberByBpard,
    getAllBoardsByMembers,
  } = useBoards();
  const { boards, colaborativeBoards, boardMembers, allBoardsByMembers } =
    myBoardInfo;

  const [selectedBoard, setSelectedBoard] = useState("");
  const [showCreateUrlModal, setShowCreateUrlModal] = useState(false);
  const [showBoardsMember, setShowBoardsMember] = useState({
    show: false,
    id: "",
    boards: [],
    rol: "",
  });

  useEffect(() => {
    const getBoards = async () => {
      await getAllBoardsByMembers();
      if (Object.entries(user).length > 0) {
        await getColaborativeBoards();
      }
    };
    getBoards();
  }, [user, boards]);

  const handleShowBoardsMember = async (id) => {
    let newData = [];
    colaborativeBoards.map((board) => {
      const myMember = board.members.filter(
        (member) => member.member_id.id === id
      );
      if (myMember.length > 0) {
        const newBoardaData = { ...board, role: myMember[0].role };
        newData.push(newBoardaData);
      } else {
        return;
      }
    });
    setShowBoardsMember({ show: true, id, boards: newData });
  };

  const handleDeleteMember = async (boardId, userId) => {
    await deleteMemberByBpard(boardId, userId);
    await getColaborativeBoards();
    let newDataa = [];
    colaborativeBoards.map((board) => {
      const myMember = board.members.filter(
        (member) => member.member_id.id === userId
      );
      if (myMember.length > 0) {
        const newBoardaData = { ...board, role: myMember[0].role };
        newDataa.push(newBoardaData);
      } else {
        return;
      }
    });
    const getUser = await GetUser({ id: userId });
    const board = await GetBoardById({ id: boardId });
    setShowBoardsMember({ show: false, id: userId, boards: newDataa });
    toast.success(
      `Has eliminado a ${getUser.name} ${getUser.surname} del tablero ${board.title}`,
      {
        duration: 4000,
        style: {
          background: "#7DA640",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#000",
        },
      }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedBoard != "Selecciona un tablero") {
      const link = await CreateInvitation({
        invitation: { user_id: user.id, board_id: selectedBoard },
      });
      navigator.clipboard.writeText(link.invitation);
      toast.success(`Inivitacion copiada!`, {
        duration: 4000,
        style: {
          background: "#7DA640",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#000",
        },
      });
    }
  };

  return (
    <>
      <div className="flex flex-col col-span-5 space-y-8 md:col-span-7 sm:col-span-7">
        <div className="flex flex-col items-start justify-start pb-4 border-b border-gray-400">
          <div className="flex items-center justify-start w-full p-1 rounded-lg logo text-[28px] sm:text-[24px]">
            <div className="w-[52px] h-[52px] flex justify-center items-center bg-gradient-to-t from-blue-600 to-violet-600 rounded-lg mr-2">
              B
            </div>
            Espacio de trabajo de Boardify
          </div>
        </div>
        <div className="space-y-4 text-[17px]">
          <h3 className="logo">Miembros del espacio de trabajo</h3>
          <p>
            Los miembros del Espacio de trabajo pueden ver todos los tableros
            visibles para el Espacio de trabajo, unirse a ellos y crear nuevos
            tableros en el Espacio de trabajo.
          </p>
        </div>
        <div className="space-y-4 text-[17px] grid grid-cols-5 gap-2">
          <div className="col-span-3 sm:col-span-5">
            <h3 className="logo">Invite a los miembros a unirse</h3>
            <p>
              Cualquiera que tenga un enlace de invitación puede unirse a este
              Espacio de trabajo gratuito. También puedes deshabilitar y crear
              un nuevo enlace de invitación para este Espacio de trabajo en
              cualquier momento. Las invitaciones pendientes cuentan para el
              límite de 10 colaboradores.
            </p>
          </div>
          <div className="flex items-start justify-end col-span-2 sm:col-span-5">
            <button
              onClick={() => setShowCreateUrlModal(true)}
              className="flex items-center justify-center p-2 mt-4 bg-gray-600 rounded-lg hover:bg-gray-500 text-start"
            >
              <img className="w-[25px] mr-2 " src={link} alt="" />
              Invitar mediante enlace
            </button>
          </div>
        </div>
        <div className="flex justify-between w-full pt-8 border-t border-gray-500">
          {boardMembers && boardMembers.length > 0 ? (
            <>
              <div className="flex items-start justify-end col-span-2 ">
                <div className="flex items-center justify-center pr-2 py-2 logo text-[20px]">
                  <img className="w-[25px] mr-2" src={users} alt="" />
                  Colaboradores
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-start justify-end col-span-2 ">
              <div className="flex items-center justify-center pr-2 py-2 logo text-[16px]">
                <img
                  className="2xl:w-[20px] w-[30px] mr-2"
                  src={users}
                  alt=""
                />
                Todos tus colaboradores a este espacio de trabajo se mostraran
                aqui{" "}
              </div>
            </div>
          )}
        </div>
        <div>
          {boardMembers &&
            boardMembers
              .sort((a, b) =>
                a.member_id.id === user.id
                  ? -1
                  : b.member_id.id === user.id
                  ? 1
                  : 0
              )
              .map((member) => {
                const { member_id: user } = member;
                return (
                  <div
                    key={member._id}
                    className="relative flex items-center justify-between py-4 border-t border-b border-gray-500"
                  >
                    <div className="flex ">
                      {user && user.profile && user.profile !== "" ? (
                        <div
                          title={user.email}
                          className={`relative cursor-pointer w-[45px] h-[45px] mr-2 py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
                            !["png", "jpg", "webp"].includes(
                              user.profile.split(".").pop().split("?")[0]
                            )
                              ? `bg-[#0065FF]`
                              : `bg-cover bg-center`
                          }`}
                          style={
                            user.profile.split(":")[0] == "https"
                              ? { backgroundImage: `url(${user.profile})` }
                              : null
                          }
                        >
                          {user.profile.split(":")[0] !== "https" &&
                            charValue(user.name, user.surname)}
                        </div>
                      ) : (
                        user.name &&
                        user.surname && (
                          <div
                            title={user.email}
                            className=" w-[45px] h-[45px] mr-2 cursor-pointer bg-[#0065FF] text-[24px] font-bold rounded-full aspect-square text-white flex justify-center items-center "
                          >
                            {charValue(user.name, user.surname)}
                          </div>
                        )
                      )}
                      <div className="flex flex-col text-[16px]">
                        <p>
                          <span className="font-bold">{user.name}</span>{" "}
                          {user.surname}
                        </p>
                        <p>{user.email} </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-end col-span-2 space-x-2">
                      <button
                        onClick={() => handleShowBoardsMember(user.id)}
                        className="flex items-end justify-end px-4 py-2 mt-4 bg-gray-600 rounded-lg hover:bg-gray-500"
                      >
                        Ver tableros ({member.numBoards})
                      </button>
                    </div>
                    {showBoardsMember.show &&
                      showBoardsMember.id === user.id && (
                        <div className="absolute bottom-[4rem] right-0 w-[320px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl">
                          <div className="relative flex items-center justify-center">
                            <h1 className="my-4 text-center">
                              Tableros del miembro
                            </h1>
                            <div
                              onClick={() =>
                                setShowBoardsMember((prevState) => ({
                                  ...prevState,
                                  show: false,
                                }))
                              }
                              className="absolute bg-transparent cursor-pointer right-4 top-4 hover:bg-gray-500"
                            >
                              {" "}
                              <img
                                className="w-[18px] h-auto"
                                src={close}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="h-auto px-3 py-1 overflow-y-auto max-h-[460px]">
                            <p className="mx-2 mb-2">
                              {user.name} {user.surname} es miembro de los
                              siguientes tableros del Espacio de trabajo:
                            </p>
                            <ul className="w-full">
                              {showBoardsMember.boards &&
                                showBoardsMember.boards.map((board) => {
                                  return (
                                    <li
                                      className="relative group hover:bg-[#d1d1d19b] rounded-lg"
                                      key={board.id}
                                    >
                                      <Link
                                        to={`/board/${board.id}`}
                                        className={`flex items-center justify-start ${
                                          board.role === "administrador"
                                            ? "w-full"
                                            : "w-[200px]"
                                        } `}
                                      >
                                        <div className="flex items-center justify-center">
                                          <div
                                            className={`relative my-2 mx-2  w-[30px] h-[30px] rounded-md overflow-hidden ${
                                              !["png", "jpg", "webp"].includes(
                                                board.background
                                                  .split(".")
                                                  .pop()
                                              )
                                                ? `bg-gradient-to-r ${board.background}`
                                                : `bg-cover bg-center`
                                            } flex justify-center items-center z-30 `}
                                            style={
                                              board.background.split("/")[0] ===
                                              "local"
                                                ? {
                                                    backgroundImage: `url(/bgImagePreview/${board.background})`,
                                                  }
                                                : board.background.split(
                                                    ":"
                                                  )[0] == "http"
                                                ? {
                                                    backgroundImage: `url(${board.background})`,
                                                  }
                                                : null
                                            }
                                          ></div>
                                          <p className="text-[15px] leading-4">
                                            {board.title} ({board.role})
                                          </p>
                                        </div>
                                      </Link>
                                      {board.role !== "administrador" && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteMember(
                                              board.id,
                                              showBoardsMember.id
                                            );
                                          }}
                                          className="absolute right-0 hidden px-3 py-1 mx-2 bg-red-500 rounded-md bottom-2 group-hover:block"
                                        >
                                          Eliminar
                                        </button>
                                      )}
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        </div>
                      )}
                  </div>
                );
              })}
        </div>
      </div>
      {showCreateUrlModal && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#0000008d] flex justify-center items-center text-white">
          <div className="w-[520px] sm:w-[380px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl">
            <div className="relative flex flex-col items-start justify-start">
              <h1 className="m-4 text-start text-[20px]">
                Invitar a un miembro a un tablero
              </h1>
              <div
                onClick={() => setShowCreateUrlModal(false)}
                className="absolute bg-transparent cursor-pointer right-4 top-4 hover:bg-gray-500"
              >
                {" "}
                <img className="w-[18px] h-auto" src={close} alt="" />
              </div>
              <form className="flex flex-col mx-4" onSubmit={handleSubmit}>
                <select
                  value={selectedBoard}
                  onChange={(event) => setSelectedBoard(event.target.value)}
                  className="w-full my-2 p-2 rounded-md bg-[#434343] outline-none sm:text-[12px]"
                  name=""
                  id=""
                >
                  <option value={undefined}>Selecciona un tablero</option>
                  {allBoardsByMembers &&
                    allBoardsByMembers.map((board) => {
                      if (
                        board.members.filter((member) => {
                          if (
                            member.member_id.id === user.id &&
                            member.role === "Administrador"
                          ) {
                            return member;
                          }
                        }).length > 0 &&
                        board.board_permissions === "Administradores"
                      ) {
                        return (
                          <option key={board.id} value={board.id}>
                            {board.title}
                          </option>
                        );
                      } else if (board.board_permissions === "Miembros") {
                        return (
                          <option key={board.id} value={board.id}>
                            {board.title}
                          </option>
                        );
                      } else if (board.user_id.id === user.id) {
                        return (
                          <option key={board.id} value={board.id}>
                            {board.title}
                          </option>
                        );
                      }
                    })}
                </select>
                <div className="flex items-center justify-between w-full my-4 space-x-4 sm:items-end sm:flex-col sm:space-y-2">
                  <p>
                    Invita a alguien al tablero seleccionado por medio de un
                    enlace:
                  </p>
                  <button
                    onClick={() => setShowCreateUrlModal(true)}
                    className="flex w-[240px] items-center justify-center p-2 bg-gray-600 rounded-lg hover:bg-gray-500"
                  >
                    <img className="w-[25px] mr-2" src={link} alt="" />
                    Copiar enlace
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
