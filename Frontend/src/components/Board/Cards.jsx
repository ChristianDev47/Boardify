/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../../helpers/StrictModeDroppable";
import edit from "../../assets/icons/edit.svg";
import clock from "../../assets/icons/clock.svg";
import files from "../../assets/icons/file.svg";
import check from "../../assets/icons/checkItem.svg";
import close from "../../assets/icons/x.svg";
import descriptionIcon from "../../assets/icons/menu.svg";
import { useCard } from "../../hook/card";
import { determineDateStatus, formatDate } from "../../services/dates";
import { charValue } from "../../services/getInitialsUsers";

CardComponent.propTypes = {
  list: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired,
};

export default function CardComponent({ list, board }) {
  const [nameCard, setNameCard] = useState("");
  const [listId, setListId] = useState("");
  const { cardsAllData, createCard, addMyCard } = useCard();
  const { cards } = cardsAllData;

  const handleNewCard = async () => {
    if (nameCard.trim() !== "") {
      const positionCards = cards[listId];
      const newData = {
        name: nameCard,
        is_active: true,
        is_completed: false,
        position: positionCards ? positionCards.length + 1 : 1,
        list_id: listId,
        background: "",
      };
      await createCard(newData);
      setListId("");
      setNameCard(""); 
    }
  };

  const handleCardClick = (cardId) => {
    addMyCard(list._id, cardId);
  };

  return (
    <>
      <Droppable droppableId={list._id} type="CARD">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {cards[list._id] &&
              cards[list._id].map((card, index) => (
                <Draggable key={card._id} draggableId={card._id} index={index}>
                  {(provided, dragSnapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        draggable={Boolean(dragSnapshot.isDragging)}
                        className="relative flex flex-col items-center justify-between bg-[#22272B] w-full group hover:bg-[#212528] rounded-lg mb-2 overflow-hidden"
                        onClick={() => handleCardClick(card._id)}
                      >
                        <div className="absolute rounded-full right-2 top-2 aspect-square bg-[#22272B] p-2 hidden group-hover:block z-50">
                          <img
                            className="w-[20px] h-auto"
                            src={edit}
                            alt="Edit"
                          />
                        </div>
                        {card.background && board.allow_background && (
                          <div>
                            {card.filename &&
                            ["jpg", "png", "webp"].includes(
                              card.background.split(".").pop().split("?")[0]
                            ) ? (
                              <div className="w-[300px] h-[160px] overflow-hidden">
                                <img
                                  className="absolute inset-0 z-30 object-contain w-[300px] h-[160px] bg-fixed bg-no-repeat bg-cover "
                                  src={card.background}
                                  alt="Background Image"
                                />
                                <div
                                  className="absolute top-0 right-0 w-full h-[140px]"
                                  style={{ backgroundColor: "" }}
                                ></div>
                              </div>
                            ) : (
                              <div
                                className="w-[350px] h-[80px]"
                                style={{ backgroundColor: card.background }}
                              ></div>
                            )}
                          </div>
                        )}
                        <div className="w-full px-3 py-2 space-y-2">
                          <div className="grid grid-cols-5 gap-1">
                            {card.labels &&
                              card.labels.map((label) => {
                                return (
                                  <div
                                    className="w-full h-3 col-span-1 px-2 my-1 mr-1 rounded-md "
                                    key={label._id}
                                    style={{
                                      backgroundColor: label.background,
                                    }}
                                  ></div>
                                );
                              })}
                          </div>
                          <span className="inline-flex items-end justify-between w-full my-1 ml-1">
                            {card.name}
                          </span>
                          <div className="flex flex-wrap items-start justify-start gap-2">
                            {card.initial_date && !card.due_date && (
                              <div className="flex items-center justify-center gap-1 p-1 text-white bg-gray-600 rounded-md text-[12px]">
                                <img className="w-[18px] " src={clock} alt="" />
                                <p>Inicio: {formatDate(card.initial_date)}</p>
                              </div>
                            )}
                            {!card.initial_date && card.due_date && (
                              <div
                                className="flex items-center justify-center gap-1 p-1 text-white text-[12px] rounded-md"
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
                            )}
                            {card.initial_date && card.due_date && (
                              <div
                                className="flex items-center justify-center gap-1 p-1 text-white rounded-md text-[12px]"
                                style={{
                                  backgroundColor: determineDateStatus(
                                    card.due_date,
                                    card
                                  ),
                                }}
                              >
                                <img className="w-[18px] " src={clock} alt="" />
                                <p>
                                  {formatDate(card.initial_date)} -{" "}
                                  {formatDate(card.due_date)}
                                </p>
                              </div>
                            )}
                            {card.description && (
                              <img
                                className="w-[28px] m-1 "
                                src={descriptionIcon}
                                alt=""
                              />
                            )}
                            {card.files && card.files.length > 0 && (
                              <div className="inline-flex items-center mb-1 ">
                                <img
                                  className="w-[18px] m-1"
                                  src={files}
                                  alt=""
                                />{" "}
                                {card.files.length}
                              </div>
                            )}
                            {card.checkItems && card.checkItems.length > 0 && (
                              <div
                                className={`inline-flex items-center mb-1 rounded-md pr-2 ${
                                  card.checkItemsCompleted ===
                                    card.checkItems.length && "bg-[#34ac7a]"
                                }`}
                              >
                                <img
                                  className="w-[18px] m-1"
                                  src={check}
                                  alt=""
                                />
                                {card.checkItemsCompleted} /{" "}
                                {card.checkItems.length}
                              </div>
                            )}
                            {
                              <div
                                className={`inline-flex items-center mb-1 rounded-md pr-2 `}
                              >
                                {card.members &&
                                  card.members.map((member) => {
                                    const { member_id: user } = member;
                                    return (
                                      <div
                                        key={member.member_id.id}
                                        className="flex items-center mx-1 rounded-sm cursor-pointer"
                                      >
                                        {user &&
                                        user.profile &&
                                        user.profile !== "" ? (
                                          <div
                                            title={user.email}
                                            className={`relative cursor-pointer w-[25px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
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
                                              user.profile.split(":")[0] ==
                                              "https"
                                                ? {
                                                    backgroundImage: `url(${user.profile})`,
                                                  }
                                                : null
                                            }
                                          >
                                            {user.profile.split(":")[0] !==
                                              "https" &&
                                              charValue(
                                                user.name,
                                                user.surname
                                              )}
                                          </div>
                                        ) : (
                                          user.name &&
                                          user.surname && (
                                            <div
                                              title={user.email}
                                              className=" w-[25px] h-[25px]  bg-[#0065FF] text-[12px] font-bold rounded-full aspect-square text-white flex justify-center items-center "
                                            >
                                              {charValue(
                                                user.name,
                                                user.surname
                                              )}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    );
                                  })}
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
            {(!cards[list._id] || cards[list._id].length === 0) &&
              provided.placeholder && (
                <div
                  className="bg-transparent rounded-lg "
                  style={{ minHeight: "3px" }}
                ></div>
              )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {listId !== list._id ? (
        <button
          onClick={() => setListId(list._id)}
          className="flex items-center justify-start w-full p-1 hover:bg-[#ffffff4b] rounded-lg transition-all duration-100 "
        >
          <span className="mx-2 text-[20px]">+</span>Añade una tarjeta
        </button>
      ) : (
        <div className="flex items-start justify-start">
          <div className="bg-[#000000c6] rounded-lg p-1 w-[320px] pr-3 pl-2">
            <input
              className="mx-1 my-1 w-full p-2 bg-transparent border-none text-[16px] font-bold "
              onChange={(event) => setNameCard(event.target.value)}
              type="text"
              placeholder="Titulo de la tarjeta"
              autoFocus
            />
            <div className="flex items-center justify-between w-full my-1">
              <button
                onClick={() => handleNewCard()}
                className={`flex items-center justify-start w-full p-2 rounded-lg transition-all duration-100 ${
                  listId.trim() === ""
                    ? "bg-[#b2b2b2bc] cursor-not-allowed"
                    : "bg-[#0065FF]"
                }`}
                disabled={listId.trim() === "" ? true : false}
              >
                Crear tarjeta
              </button>
              <button
                onClick={() => setListId("")}
                className="w-[30px] h-[30px] rounded-md hover:bg-[#ffffff4b] transition-all duration-100 ml-2 p-1"
              >
                <img src={close} alt="" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
