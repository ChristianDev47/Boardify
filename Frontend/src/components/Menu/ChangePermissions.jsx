import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { GetBoardById, UpdateBoard } from "../../services/project";
import { useAuth } from "../../hook/useAuth";
import close from "../../assets/icons/x.svg";
import check from "../../assets/icons/selected.svg";

ChangePermissions.propTypes = {
  board: PropTypes.object.isRequired,
};

export default function ChangePermissions({ board }) {
  const [members, setMembers] = useState();
  const [myMember, setMyMember] = useState();
  const { user: loginUser } = useAuth();
  const [showChangeModal, setShowChangeModal] = useState({
    show: false,
    id: "",
  });

  const handleChangeRol = async (rol) => {
    const myMembers = members.map((member) => {
      if (member.member_id.id === myMember.member_id.id) {
        return { ...member, member_id: member.member_id.id, role: rol };
      } else {
        return { ...member, member_id: member.member_id.id };
      }
    });
    const newRolMember = await UpdateBoard({
      id: board.id,
      data: { members: myMembers },
    });
    const newMembers = await GetBoardById({ id: newRolMember.id });
    setMembers(newMembers.members);
    const myNewRolSelectedMember = newMembers.members.filter(
      (member) => member.member_id.id === myMember.member_id.id
    );
    setMyMember(myNewRolSelectedMember[0]);
  };

  const ChangeModal = () => {
    return (
      <div className="absolute top-[35px] left-0 w-[340px] h-auto bg-[#2d2d2d] rounded-md shadow-2xl z-40">
        <div className="relative flex items-center justify-center">
          <h1 className="mt-3 text-center">Selecciona un nuevo rol</h1>
          <div
            onClick={() => setShowChangeModal(false)}
            className="absolute bg-transparent cursor-pointer right-4 top-4 hover:bg-gray-500"
          >
            {" "}
            <img className="w-[18px] h-auto" src={close} alt="" />
          </div>
        </div>
        <div className="py-4">
          <div
            onClick={() => handleChangeRol("administrador")}
            className="px-4 py-2 cursor-pointer hover:bg-gray-600"
          >
            <div className="flex items-center justify-between">
              Administrador{" "}
              {myMember.role === "administrador" && (
                <img className="w-[20px] mx-2" src={check} alt="" />
              )}
            </div>
          </div>
          <div
            onClick={() => handleChangeRol("colaborador")}
            className="px-4 py-2 cursor-pointer hover:bg-gray-600"
          >
            <div className="flex items-center justify-between">
              Colaborador{" "}
              {myMember.role === "colaborador" && (
                <img className="w-[20px] mx-2" src={check} alt="" />
              )}{" "}
            </div>
          </div>
          <div
            onClick={() => handleChangeRol("invitado")}
            className="px-4 py-2 cursor-pointer hover:bg-gray-600"
          >
            <div className="flex items-center justify-between">
              Invitado{" "}
              {myMember.role === "invitado" && (
                <img className="w-[20px] mx-2" src={check} alt="" />
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const getMembers = async () => {
      const newMembers = await GetBoardById({ id: board.id });
      setMembers(newMembers.members);
    };
    board && getMembers();
  }, [board]);

  const handleShowOptions = (id) => {
    setShowChangeModal({ show: true, id });
    const mySelectedMember = members.filter(
      (member) => member.member_id.id === id
    );
    setMyMember(mySelectedMember[0]);
  };

  return (
    <div className="w-full h-full ">
      {members && (
        <div>
          <p>Miembros de la tarjeta</p>
          <div className="my-2">
            {members.map((member) => {
              const { member_id: user } = member;
              const letters = [user.name, user.surname].map((char) => {
                return char.slice(0, 1);
              });
              const char = letters.join("").toUpperCase();
              return (
                <div
                  key={member.member_id.id}
                  className="relative flex items-center justify-between py-1 my-1 rounded-sm cursor-pointer"
                >
                  <div className="flex items-center justify-center">
                    <div className="relative w-[35px] h-[35px] flex items-center justify-center font-semibold bg-blue-600 rounded-full aspect-square mr-4">
                      <div className="text-[14px] text-white">{char}</div>
                    </div>
                    <div className="flex flex-col text-[14px]">
                      <p>
                        <span className="font-bold">
                          {user.name} {user.surname}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleShowOptions(user.id)}
                    className={`px-3 py-1 rounded-md  ${
                      user.id === loginUser.id
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    disabled={user.id === loginUser.id ? true : false}
                  >
                    {member.role}
                  </button>
                  {showChangeModal.show && showChangeModal.id === user.id && (
                    <ChangeModal />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
