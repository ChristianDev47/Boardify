/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAuth } from "../../hook/useAuth";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useCard } from "../../hook/card";
import { charValue } from "../../services/getInitialsUsers";
import { useList } from "../../hook/lists";

CalendarWithData.propTypes = {
  id: PropTypes.string.isRequired,
};

export default function CalendarWithData({ id }) {
  const { user } = useAuth();
  const [cardsCalendar, setCardsCalendar] = useState([]);
  const { cardsAllData } = useCard();
  const { cards } = cardsAllData;
  const { listsData } = useList();
  const { lists } = listsData;

  useEffect(() => {
    const getCardData = async () => {
      let cardsData = []
      for (const list of lists) {
        if(cards[list._id]){
          cards[list._id].map(card => {
            if (card.due_date) {
              const data = {
                cardid: card._id,
                name: card.name,
                list: card.list_id,
                labels: card.labels,
                members: card.members,
                start: card.initial_date ? card.initial_date : card.due_date,
                end: card.due_date,
                is_completed: card.is_completed,
              };
              cardsData.push(data);
            }
          })
        }
      }
      setCardsCalendar(cardsData);
    };
    
    Object.keys(user).length > 0 && getCardData();
  }, [id, cards]);

  const renderEventContent = (eventInfo) => {

    const card = eventInfo.event.extendedProps;
    return (
      <div className=" relative flex items-center justify-start bg-[#22272B] w-full group  rounded-lg transition-all duration-100 my-2 overflow-x-auto">
        <div className="flex items-center justify-between w-full p-1">
          <div>
            <div className="grid w-full grid-cols-5 gap-1">
              {card.labels &&
                card.labels.map((label) => {
                  return (
                    <div
                      className="w-full h-2 col-span-1 px-2 my-1 mr-1 rounded-md "
                      key={label._id}
                      style={{ backgroundColor: label.background }}
                    ></div>
                  );
                })}
            </div>
            <strong>{card.name}</strong>
          </div>
          <div className={`flex items-center justify-center rounded-md  `}>
            {card.members.slice(0, 1).map((member) => {
              const { member_id: user } = member;
              return (
                <div
                  key={member.member_id.id}
                  className="flex items-center justify-center rounded-sm cursor-pointer "
                >
                  {user && user.profile && user.profile !== "" ? (
                    <div
                      title={user.email}
                      className={`relative cursor-pointer w-[35px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
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
                      <div className=" w-[35px] h-[35px]  bg-[#0065FF] text-[24px] font-bold rounded-full aspect-square text-white flex justify-center items-center ">
                        {charValue(user.name, user.surname)}
                      </div>
                    )
                  )}
                </div>
              );
            })}
            {card.members.length > 2 && (
              <div className="flex items-center rounded-sm cursor-pointer ">
                <div className="relative w-[30px] h-[30px] flex items-center justify-center font-semibold bg-gray-500 hover:bg-gray-400 rounded-full aspect-square mx-0.5">
                  <div className="text-[14px] text-white">
                    {card.members.length - 2}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="h-full overflow-y-auto">
      <div className="mt-4 mb-[5rem] ml-6 mr-4">
        <FullCalendar
          firstDay={1}
          locale="es"
          events={cardsCalendar}
          eventColor="#000000b4"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          defaultView="dayGridMonth"
          eventContent={renderEventContent}
          eventBackgroundColor="#22272b00"
          eventBorderColor="#22272b00"
        />
      </div>
    </div>
  );
}
