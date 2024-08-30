/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import close from "../../assets/icons/x.svg";
import boardIcon from "../../assets/icons/board.svg";
import descriptionIcon from "../../assets/icons/menu.svg";
import { useExtractColor } from "react-extract-colors";

import PropTypes from "prop-types";
import NavbarOptions from "../CardModal/NavbarOptions";
import Labels from "../CardModal/Labels";
import ShowActivity from "../CardModal/ShowActivity";
import CheckItems from "../CardModal/CheckItems";
import Dates from "../CardModal/Dates";
import CardFile from "../CardModal/CardFiles";
import { useCard } from "../../hook/card";
import { colorsArray } from "../../services/colors";
import { charValue } from "../../services/getInitialsUsers";
import { GetCardActivity } from "../../services/project";

CardModal.propTypes = {
  board: PropTypes.object.isRequired,
};

export default function CardModal({ board }) {
  // Label and activity
  const { cardsAllData, updateCard, updateAllCardData, updateCardDataByList, clearMyCard } =
    useCard();
  const { cards, myCard: myCardWithData } = cardsAllData;
  const [myCard, setMyCard] = useState(myCardWithData);
  const [labels, setLabels] = useState(myCardWithData.labels);
  const [checkItems, setCheckItems] = useState(myCardWithData.checkItems);
  const [cardFiles, setCardFiles] = useState(myCardWithData.files);
  const [members, setMembers] = useState([]);
  const [cardMembers, setCardMembers] = useState(myCardWithData.members);
  // Modal or sections
  const [modalLabel, setModalLabel] = useState(false);
  const [description, setDescription] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [checklistModal, setCheckListModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [cardFileModal, setCardFileModal] = useState(false);
  const [backgroundModal, setBackgroundModal] = useState(false);
  const [membersModal, setMembersModal] = useState(false);

  useEffect(() => {
    updateCardDataByList(myCard.list_id._id);
  }, [labels, checkItems, cardFiles, members, cardMembers, myCard]);

  const [myLabel, setMyLabel] = useState({
    id: "",
    name: "",
    background: colorsArray[0],
    color: "#FFFFFF",
  });
  const [dateStatus, setDateStatus] = useState({ announce: "", color: "" });
  const [cardActivity, setCardActivity] = useState();


  const handleCardUpdate = (e, id, listId, property) => {
    const updatedCard = cards[listId].map((card) => {
      if (card._id === id) {
        return { ...card, [property]: e.target.value };
      }
      return card;
    });
    setMyCard(updatedCard.filter((card) => card._id === id)[0]);
  };
  const handleCardUpdateUpdate = (id, property, e) => {
    const updatename = async () => {
      const newCardUpdate =
        property === "name" ? e.target.value : myCard.description;
      await updateCard(id, { [property]: newCardUpdate });
      await updateAllCardData({ ...myCard, [property]: newCardUpdate });
      setMyCard({ ...myCard, [property]: newCardUpdate });
    };
    property === "description" && setDescription(false);
    updatename();
  };

  useEffect(() => {
    const getCardComponents = async () => {
      setCardMembers(myCard.members);
      if (myCard.members.length > 0) {
        const newBoardMembers = board.members.filter((member) => {
          if (
            !myCard.members
              .map((memberCard) => {
                return memberCard.member_id.id;
              })
              .includes(member.member_id.id)
          ) {
            return member;
          }
        });
        setMembers(newBoardMembers);
      } else {
        setMembers(board.members);
      }
    };
    getCardComponents();
  }, [myCard, board]);

  useEffect(() => {
    const getActiities = async () => {
      setCardActivity(await GetCardActivity({ cardId: myCard._id }));
    };
    myCard._id && getActiities();
  }, [myCard, checkItems, cardFiles]);

  const handleNewLabel = () => {
    setMyLabel((prevState) => ({
      ...prevState,
      background: colorsArray[0],
      color: "#FFFFFF",
      name: "",
    }));
    setEditModal(false);
    setModalLabel(true);
  };

  const { dominantColor } = useExtractColor(myCard.background);
  return (
    <>
      {myCardWithData && (
        <div className="absolute top-0 bottom-0 m-auto bg-[#0000008a] z-[200] w-full h-full flex justify-center items-center">
          <div className="relative flex flex-col items-center justify-start w-full h-full overflow-auto py-[2rem] z-50 ">
            <div className=" w-[750px] md:w-[90%] sm:w-[90%] bg-[#323940] rounded-2xl z-50 text-white ">
              {myCard.background && (
                <div>
                  {["jpg", "png", "webp"].includes(
                    myCard.background.split(".").pop().split("?")[0]
                  ) ? (
                    <div className="relative w-full h-[200px] overflow-hidden   rounded-t-2xl ">
                      <img
                        className="absolute inset-0 z-50 object-contain w-full h-full "
                        src={myCard.background}
                        alt="Background Image"
                      />
                      <div
                        className="absolute top-0 z-30 w-full h-full"
                        style={{ backgroundColor: dominantColor }}
                      ></div>
                    </div>
                  ) : (
                    <div
                      className="w-full h-[160px] rounded-t-2xl "
                      style={{ backgroundColor: myCard.background }}
                    ></div>
                  )}
                </div>
              )}

              <div className="p-6 sm:py-4 sm:px-1">
                <div className="flex items-center justify-between h-auto">
                  <div className="flex justify-start w-full">
                    <img className="w-[28px] ml-4" src={boardIcon} alt="" />
                    <input
                      className="mx-1 w-full px-2 py-1 bg-transparent border-none text-[22px] font-bold resize-none max-h-max h-auto"
                      value={myCard.name}
                      onChange={(e) =>
                        handleCardUpdate(
                          e,
                          myCard._id,
                          myCard.list_id._id,
                          "name"
                        )
                      }
                      onBlur={(e) =>
                        handleCardUpdateUpdate(myCard._id, "name", e)
                      }
                      type="text"
                    />
                  </div>
                  <button onClick={() => clearMyCard()}>
                    <img className="w-[20px] h-auto ml-4" src={close} alt="" />
                  </button>
                </div>
                <p className="text-[14px] ml-14">
                  En la lista{" "}
                  <span className="font-bold">{myCard.list_id.name}</span>
                </p>
                <div className="grid grid-cols-7 gap-2 mt-8 ml-4 ">
                  <div className="relative col-span-5 md:col-span-7 sm:col-span-7">
                    {cardMembers.length > 0 && (
                      <div className="grid grid-cols-10 gap-2 mb-8 ml-10">
                        <h3 className=" text-[14px] col-span-10">Miembros</h3>
                        {cardMembers.map((member) => {
                          const { member_id: user } = member;
                          return (
                            <div
                              onClick={() => setMembersModal(true)}
                              key={member.member_id.id}
                              className="flex items-center rounded-sm cursor-pointer "
                            >
                              {user && user.profile && user.profile !== "" ? (
                                <div
                                  title={user.email}
                                  className={`relative cursor-pointer w-[45px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
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
                                    className=" w-[45px] cursor-pointer h-auto  bg-[#0065FF] text-[16px] font-bold rounded-full aspect-square text-white flex justify-center items-center "
                                  >
                                    {charValue(user.name, user.surname)}
                                  </div>
                                )
                              )}
                            </div>
                          );
                        })}
                        <div
                          onClick={() => setMembersModal(true)}
                          className="flex items-center cursor-pointer w-[35px] h-[35px] bg-gray-500 justify-center hover:bg-gray-400 aspect-square rounded-full "
                        >
                          <div className="relative flex items-center justify-center mx-2 font-semibold ">
                            <div className="text-[14px] text-white">+</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {labels && labels.length > 0 && (
                      <Labels
                        labels={labels}
                        setLabels={setLabels}
                        handleNewLabel={handleNewLabel}
                        setMyLabel={setMyLabel}
                        setEditModal={setEditModal}
                        setModalLabel={setModalLabel}
                      />
                    )}
                    {(myCard.due_date || myCard.initial_date) && (
                      <Dates
                        myCard={myCard}
                        dateStatus={dateStatus}
                        setDateStatus={setDateStatus}
                        setMyCard={setMyCard}
                        setDateModal={setDateModal}
                      />
                    )}
                    <div className="flex mt-2 mb-2">
                      <img
                        className="w-[26px] h-[26px] mr-4"
                        src={descriptionIcon}
                        alt=""
                      />
                      <h3 className="font-semibold">Descripción</h3>
                    </div>
                    {description ? (
                      <div className="ml-11 sm:mx-11">
                        <textarea
                          className="w-full p-2 bg-gray-600 border-none text-[16px] font-bold inline-block"
                          value={myCard.description}
                          onChange={(e) =>
                            handleCardUpdate(
                              e,
                              myCard._id,
                              myCard.list_id._id,
                              "description"
                            )
                          }
                          type="text"
                          rows={4}
                          cols={50}
                          placeholder="Agrega una descripción"
                        />
                        <div className="space-x-2">
                          <button
                            onClick={() =>
                              handleCardUpdateUpdate(myCard._id, "description")
                            }
                            className="px-4 py-2 rounded-sm bg-[#0066ffbb] hover:bg-[#468bf3]"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setDescription(false)}
                            className="px-4 py-2 rounded-sm bg-[#6e6e6ebb] hover:bg-[#6e6e6ef4]"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => setDescription(true)}
                        className="px-2 pt-2 pb-10 bg-gray-700 cursor-pointer ml-11 sm:mx-11 hover:bg-gray-600"
                      >
                        {myCard.description
                          ? myCard.description
                          : "Añade una descripción más detallada..."}
                      </div>
                    )}
                    {cardFiles && cardFiles.length > 0 && (
                      <CardFile
                        myCard={myCard}
                        cardFiles={cardFiles}
                        setCardFiles={setCardFiles}
                        setCardFileModal={setCardFileModal}
                      />
                    )}
                    {checkItems && checkItems.length > 0 && (
                      <CheckItems
                        checkItems={checkItems}
                        setCheckItems={setCheckItems}
                        myCard={myCard}
                        setCheckListModal={setCheckListModal}
                      />
                    )}

                    <ShowActivity
                      cardActivity={cardActivity}
                    />
                  </div>
                  {labels && (
                    <NavbarOptions
                      labels={labels}
                      handleNewLabel={handleNewLabel}
                      modalLabel={modalLabel}
                      setModalLabel={setModalLabel}
                      setMyLabel={setMyLabel}
                      setLabels={setLabels}
                      myLabel={myLabel}
                      myCard={myCard}
                      editModal={editModal}
                      setCheckItems={setCheckItems}
                      checklistModal={checklistModal}
                      setCheckListModal={setCheckListModal}
                      setMyCard={setMyCard}
                      dateModal={dateModal}
                      setDateModal={setDateModal}
                      cardFileModal={cardFileModal}
                      setCardFileModal={setCardFileModal}
                      setCardFiles={setCardFiles}
                      cardFiles={cardFiles}
                      backgroundModal={backgroundModal}
                      setBackgroundModal={setBackgroundModal}
                      members={members}
                      setMembersModal={setMembersModal}
                      membersModal={membersModal}
                      cardMembers={cardMembers}
                      setCardMembers={setCardMembers}
                      setMembers={setMembers}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
