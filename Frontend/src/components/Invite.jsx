/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import load from "../assets/icons/load.svg";
import { GetBoardById, GetInvitationById } from "../services/project";
import { useAuth } from "../hook/useAuth";
import { useBoards } from "../hook/boards";
import toast from "react-hot-toast";

export default function Invite() {
  const { user } = useAuth();
  const { id } = useParams();
  const [myInvitation, setMyInvitation] = useState();
  const { updateBoards, getBoarsdByUser } = useBoards();
  const navigateTo = useNavigate();

  useEffect(() => {
    const getInformation = async () => {
      const invitation = await GetInvitationById({ id });
      const myBoard = await GetBoardById({ id: invitation.board_id.id });
      const members = myBoard.members.filter(
        (member) => member.member_id.id === user.id
      );
      if (members.length > 0) {
        toast.error(`Usted ya pertenece al tablero!`, {
          duration: 4000,
        });
        navigateTo("/miespaciodetrabajo");
      }
      setMyInvitation(invitation);
    };
    getInformation();
  }, []);
  const [progressButton, setProgresButton] = useState(false);

  const handleInvitationAccepted = async () => {
    setProgresButton(true);
    const newMember = {
      member_id: user.id,
      role: "colaborador",
      permissions: ["read", "edit"],
    };
    if (user.id !== myInvitation.user_id.id) {
      await updateBoards(myInvitation.board_id.id, {
        members: [...myInvitation.board_id.members, newMember],
      });
    }
    setTimeout(async () => {
      if (Object.entries(user).length > 0) {
        await getBoarsdByUser();
      }
      navigateTo(`/miespaciodetrabajo`);
    }, 3000);
  };
  return (
    <>
      {myInvitation && (
        <div className="w-full h-screen bg-[#22272B] text-gray-300 flex flex-col items-center justify-start p-24">
          <div className="space-y-4 text-center text-[24px]">
            <p>
              {myInvitation.user_id.name} {myInvitation.user_id.surname} le ha
              invitado al tablero denominado: {myInvitation.board_id.title}!
            </p>
            <button
              onClick={() => handleInvitationAccepted()}
              className="p-3 w-[250px] bg-[#0065FF] rounded-md text-[19px] text-white"
            >
              <div className="flex items-center justify-center">
                {progressButton === false ? (
                  <p>Unirse al tablero</p>
                ) : (
                  <div className="w-fit animate-spin">
                    <img
                      className={`top-0 w-[20px] h-[20px] my-1`}
                      src={load}
                      alt=""
                    />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
