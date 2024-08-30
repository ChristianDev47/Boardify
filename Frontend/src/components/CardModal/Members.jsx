import PropTypes from "prop-types";
import close from "../../assets/icons/x.svg";
import { GetCardById, UpdateCards } from "../../services/project";
import { charValue } from "../../services/getInitialsUsers";

MembersComponent.propTypes = {
  setMemberModal: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired,
  myCard: PropTypes.object.isRequired,
  cardMembers: PropTypes.array.isRequired,
  setCardMembers: PropTypes.func.isRequired,
  setMembers: PropTypes.func.isRequired,
};

export default function MembersComponent({
  setMemberModal,
  members,
  cardMembers,
  myCard,
  setCardMembers,
  setMembers,
}) {
  const handleAddMember = async (id) => {
    const actualMembers = cardMembers.map((myMember) => {
      return { member_id: myMember.member_id.id };
    });
    const newMembers = [...actualMembers, { member_id: id }];
    const newMember = await UpdateCards({
      id: myCard._id,
      data: { members: newMembers },
    });
    const memberCreated = await GetCardById({ cardId: newMember._id });
    const newBoardMembers = members.filter((member) => {
      if (
        !memberCreated.members
          .map((memberCard) => {
            return memberCard.member_id.id;
          })
          .includes(member.member_id.id)
      ) {
        return member;
      }
    });
    setMembers(newBoardMembers);
    setCardMembers(memberCreated.members);
  };

  const handleDeleteMember = async (id) => {
    const filterMembers = [];
    let descartedMember;
    for (const myMember of cardMembers) {
      if (myMember.member_id.id === id) {
        descartedMember = { member_id: myMember.member_id };
      } else {
        {
          filterMembers.push({ member_id: myMember.member_id.id });
        }
      }
    }
    const newMember = await UpdateCards({
      id: myCard._id,
      data: { members: filterMembers },
    });
    const memberCreated = await GetCardById({ cardId: newMember._id });
    setMembers((prevState) => [...prevState, descartedMember]);
    setCardMembers(memberCreated.members);
  };
  return (
    <div className="absolute 2xl:top-28 xl:top-28 lg:top-28 md:bottom-0 sm:bottom-0 2xl:left-0 xl:left-0 lg:left-0 md:right-0 sm:right-0 w-[300px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl">
      <div className="relative flex items-center justify-center">
        <h1 className="my-4 text-center">Miembros</h1>
        <div
          onClick={() => setMemberModal(false)}
          className="absolute bg-transparent cursor-pointer right-4 top-4 hover:bg-gray-500"
        >
          {" "}
          <img className="w-[18px] h-auto" src={close} alt="" />
        </div>
      </div>
      <div className="p-3">
        {cardMembers.length > 0 && (
          <div>
            <p>Miembros de la tarjeta</p>
            <div>
              {cardMembers.map((member) => {
                const { member_id: user } = member;
                return (
                  <div
                    onClick={() => handleDeleteMember(user.id)}
                    key={member.member_id.id}
                    className="flex items-center gap-2 p-1 my-1 rounded-sm cursor-pointer hover:bg-gray-600"
                  >
                    {user && user.profile && user.profile !== "" ? (
                      <div
                        className={`relative cursor-pointer w-[45px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
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
                        <div className=" w-[45px] h-[45px]  bg-[#0065FF] text-[24px] font-bold rounded-full aspect-square text-white flex justify-center items-center ">
                          {charValue(user.name, user.surname)}
                        </div>
                      )
                    )}
                    <div className="flex flex-col text-[14px]">
                      <p>
                        <span className="font-bold">
                          {user.name} {user.surname}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {members.length > 0 && (
          <>
            <p>Miembros del tablero</p>
            {members &&
              members.map((member) => {
                const { member_id: user } = member;
                return (
                  <div
                    onClick={() => handleAddMember(user.id)}
                    key={member.member_id.id}
                    className="flex items-center gap-2 p-1 my-1 rounded-sm cursor-pointer hover:bg-gray-600"
                  >
                    {user && user.profile && user.profile !== "" ? (
                      <div
                        className={`relative cursor-pointer w-[45px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
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
                        <div className=" w-[45px] h-[45px]  bg-[#0065FF] text-[24px] font-bold rounded-full aspect-square text-white flex justify-center items-center ">
                          {charValue(user.name, user.surname)}
                        </div>
                      )
                    )}
                    <div className="flex flex-col text-[14px]">
                      <p>
                        <span className="font-bold">
                          {user.name} {user.surname}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
}
