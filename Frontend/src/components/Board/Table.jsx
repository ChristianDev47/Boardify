/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clock from "../../assets/icons/clock.svg";
import Filter from "./Filter";
// import { useFilters } from "../../hook/filter";
import { determineDateStatus, formatDate } from "../../services/dates";
import { useCard } from "../../hook/card";
import { charValue } from "../../services/getInitialsUsers";
import { useList } from "../../hook/lists";
import { useFilters } from "../../hook/filter";

TableComponent.propTypes = {
  setShowFilter: PropTypes.func.isRequired,
  showFilter: PropTypes.bool.isRequired,
  members: PropTypes.array.isRequired,
};

export default function TableComponent({
  setShowFilter,
  showFilter,
  members,
}) {
  const [cardsFilter, setCardsFilter] = useState([]);
  const { cardsAllData, addMyCard } = useCard();
  const { cards } = cardsAllData;
  const { listsData } = useList();
  const { filterCards, filters } = useFilters();
  const { lists } = listsData;

  useEffect(() => {
    const cardsFiltered = []
    lists.map(list => {
      if(cards[list._id]){
        cards[list._id].map(card => {
          cardsFiltered.push(card)
        })
      }
    })
    
    setCardsFilter(filterCards(cardsFiltered));
  }, [ cards, filters ]);

  return (
    <>
      {showFilter === true && (
        <Filter setShowFilter={setShowFilter} members={members} lists={lists} />
      )}
      <div className="block w-full h-full overflow-x-auto border rounded-md ">
        <table className="items-center w-full bg-[#00000078] border-collapse text-gray-50">
          <thead className="divide-y divide-gray-200 bg-[#1F2130]">
            <tr className="text-xs font-semibold text-left uppercase align-top ">
              <th className="p-4 border-l-0 border-r-0whitespace-nowrap">
                Tarjeta
              </th>
              <th className="p-4 border-l-0 border-r-0whitespace-nowrap">
                Lista
              </th>
              <th className="p-4 border-l-0 border-r-0whitespace-nowrap">
                Etiquetas
              </th>
              <th className="p-4 border-l-0 border-r-0whitespace-nowrap">
                Miembros
              </th>
              <th className="p-4 border-l-0 border-r-0whitespace-nowrap">
                Fecha de vencimiento
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cardsFilter.length > 0 &&
              cardsFilter.map((card) => {
                return (
                  <tr
                    key={card._id}
                    onClick={() => {
                      addMyCard(card.list_id._id, card._id);
                    }}
                    className="text-gray-100 cursor-pointer hover:bg-gray-500"
                  >
                    <th className="p-4 px-4 text-sm font-normal text-left align-top border-t-0 whitespace-nowrap">
                      {card.name}
                    </th>
                    <td className="p-4 px-4 text-xs font-medium align-top border-t-0 whitespace-nowrap">
                      {card.list_id.name}
                    </td>
                    <td className="flex max-w-[300px] flex-wrap gap-2 p-4 px-4 text-xs font-medium align-top border-t-0 whitespace-nowrap">
                      {card.labels.length > 0 ? (
                        card.labels.map((label) => {
                          return (
                            <div key={label._id}>
                              <div
                                className={`py-1 px-4  text-center rounded-md cursor-pointer `}
                                style={{
                                  backgroundColor: label.background,
                                  color: label.color,
                                }}
                              >
                                {label.name}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-xs font-medium align-top whitespace-nowrap">
                          Sin etiquetas
                        </div>
                      )}
                    </td>
                    <td className="p-4 px-4 text-xs font-medium align-top border-t-0 whitespace-nowrap">
                      <div className="flex gap-2">
                        {card.members.length > 0 ? (
                          card.members.slice(0, 4).map((member) => {
                            const { member_id: user } = member;
                            return (
                              <div
                                key={member.member_id.id}
                                className="flex items-center rounded-sm cursor-pointer "
                              >
                                {user && user.profile && user.profile !== "" ? (
                                  <div
                                    title={user.email}
                                    className={`relative cursor-pointer w-[35px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
                                      !["png", "jpg", "webp"].includes(
                                        user.profile
                                          .split(".")
                                          .pop()
                                          .split("?")[0]
                                      )
                                        ? `bg-[#0065FF]`
                                        : `bg-cover bg-center`
                                    }`}
                                    style={
                                      user.profile.split(":")[0] == "https"
                                        ? {
                                            backgroundImage: `url(${user.profile})`,
                                          }
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
                                      className=" w-[35px] h-[35px] cursor-pointer bg-[#0065FF] text-[12px] font-bold rounded-full aspect-square text-white flex justify-center items-center "
                                    >
                                      {charValue(user.name, user.surname)}
                                    </div>
                                  )
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-xs font-medium align-top whitespace-nowrap">
                            Sin miembros
                          </p>
                        )}
                        {card.members.length > 4 && (
                          <div className="flex items-center rounded-sm cursor-pointer ">
                            <div className="relative w-[30px] h-[30px] flex items-center justify-center font-semibold bg-gray-500 hover:bg-gray-400 rounded-full aspect-square mx-0.5">
                              <div className="text-[14px] text-white">+1</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    {card.due_date ? (
                      <td className="p-4 px-4 text-xs font-medium align-top border-t-0 whitespace-nowrap">
                        <div
                          className="flex items-start p-1 mr-2 text-white rounded-md max-w-max"
                          style={{
                            backgroundColor: determineDateStatus(
                              card.due_date,
                              card
                            ),
                          }}
                        >
                           {
                            determineDateStatus(card.due_date, card) === '#4BCE97' ? <p>Cumplida</p>:
                            <>
                              <img className="w-[18px] " src={clock} alt="" />
                              <p>{formatDate(card.due_date)}</p>

                            </>
                          }
                        </div>
                      </td>
                    ) : (
                      <td className="p-4 px-4 text-xs font-medium align-top whitespace-nowrap">
                        Sin fecha de vencimiento
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
