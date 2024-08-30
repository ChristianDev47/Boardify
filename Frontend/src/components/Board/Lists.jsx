/* eslint-disable react-hooks/exhaustive-deps */
import dots from "../../assets/icons/dots.svg";
import close from "../../assets/icons/x.svg";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../../helpers/StrictModeDroppable";
import { useState } from "react";
import CardComponent from "./Cards";
import ListOptions from "../CardModal/ListOptions";
import { useBoards } from "../../hook/boards";
import { useList } from "../../hook/lists";
import { useCard } from "../../hook/card";
import ModalToggle from "../../ui/ModalToggle";

export default function ListComponent() {
  const { listsData, createList, updateList, updateListData } =
    useList();
  const { lists } = listsData;
  const { updateCardData, cardsAllData, updateCard } = useCard();
  const { cards } = cardsAllData;
  const [nameList, setNameList] = useState("");
  const [newList, setNewList] = useState(false);
  const { myBoardInfo } = useBoards();
  const { myBoard: board } = myBoardInfo;

  const handleNewList = () => {
    const newData = {
      name: nameList,
      position: lists.length + 1,
      board_id: board.id,
    };
    createList(newData);
    setNewList(false);
  };

  const handleList = (e, id) => {
    const updatedLists = lists.map((list) => {
      if (list._id === id) {
        return { ...list, name: e.target.value };
      }
      return list;
    });
    updateListData(updatedLists);
  };

  const handleListUpdate = (e, id) => {
    const updatename = async () => {
      const newListName = e.target.value;
      if (newListName.trim() !== "") {
        const newData = { name: newListName };
        updateList(id, newData);
      }
    };
    updatename();
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;
    // If there's no destination or the draggable is dropped back to its original position
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // If the type of the droppable area is COLUMN (list)
    if (type === "COLUMN") {
      const items = Array.from(lists);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      items.map(async (list, index) => {
        const newData = { position: index + 1 };
        updateList(list._id, newData);
      });
      updateListData(items);
    }
    // If the type of the droppable area is CARD
    if (type === "CARD") {
      const startList = lists
        ? lists.find((list) => list._id === source.droppableId)
        : null;
      const endList = lists
        ? lists.find((list) => list._id === destination.droppableId)
        : null;
      if (!startList || !endList) {
        return;
      }

      // If the card is moved within the same list
      if (startList._id === endList._id) {
        const items = Array.from(cards[endList._id]);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const newData = await Promise.all(
          items.map(async (card, index) => {
            const newData = { ...card, position: index + 1 };
            return newData;
          })
        );
        const data = {
          ...cards,
          [endList._id]: newData,
        };
        updateCardData(data);
        Promise.all(
          newData.map(async (card) => {
            await updateCard(card._id, { position: card.position });
          })
        );
      } else {
        // If the card is moved to a different list
        const newPosition = destination.index + 1;
        const oldPosition = source.index + 1;
        const cardMoved = cards[startList._id].find(
          (c) => c._id === draggableId
        );

        const SourceData = await Promise.all(
          cards[startList._id].map(async (card) => {
            if (card._id !== draggableId) {
              if (card.position >= oldPosition) {
                return { ...card, position: card.position - 1 };
              } else {
                return card;
              }
            } else {
              return null;
            }
          })
        );
        const updatedOriginCards = SourceData.filter(
          (card) => card !== null && card !== undefined
        );

        // Update cards in the destination list
        const destinationCards = cards[endList._id]
          ? [...cards[endList._id], cardMoved]
          : [cardMoved];
        const updatedDestinationCards = await Promise.all(
          destinationCards.map(async (card) => {
            if (card._id === draggableId) {
              return { ...card, position: newPosition, list_id: endList };
            } else if (card.position >= newPosition) {
              return { ...card, position: card.position + 1 };
            } else {
              return card;
            }
          })
        );

        const sortedUpdatedOriginCards = updatedOriginCards.sort(
          (a, b) => a.position - b.position
        );
        const sortedUpdatedDestinationCards = updatedDestinationCards.sort(
          (a, b) => a.position - b.position
        );
        const data = {
          ...cards,
          [startList._id]: sortedUpdatedOriginCards,
          [endList._id]: sortedUpdatedDestinationCards,
        };
        updateCardData(data);

        Promise.all(
          updatedOriginCards.map(async (card) => {
            if (card.position >= oldPosition) {
              await updateCard(card._id, { position: card.position - 1 });
            }
          })
        );

        Promise.all(
          updatedDestinationCards.map(async (card) => {
            if (card._id === draggableId) {
              await updateCard(draggableId, {
                position: newPosition,
                list_id: endList._id,
              });
            } else if (card.position >= newPosition) {
              await updateCard(card._id, { position: card.position + 1 });
            }
          })
        );
      }
    }
  };


  return (
    <div className="flex items-start justify-start w-full h-full p-5 overflow-x-auto overflow-y-auto ">
      <div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="lists" type="COLUMN" direction="horizontal">
            {(provided) => (
              <div
                className="flex items-start justify-start mb-8"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists &&
                  lists.map((list, index) => {
                    return (
                      <Draggable
                        key={list._id}
                        draggableId={list._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className=" bg-[#000000c6] rounded-lg p-1 w-[320px] mr-3"
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="relative flex items-center justify-between"
                            >
                              <input
                                className="mx-1 my-2 w-full p-2 bg-transparent border-none text-[16px] font-bold inline-block"
                                value={list.name}
                                onChange={(e) => handleList(e, list._id)}
                                onBlur={(e) => handleListUpdate(e, list._id)}
                                type="text"
                              />
                              <div>
                              <ModalToggle
                                  modalId={list._id}
                                  toggleButtonId={list._id}
                                  ModalComponent={ListOptions}
                                  className="w-[30px] h-[30px] rounded-md hover:bg-[#ffffff4b] transition-all duration-100 mx-4"
                                  title={
                                    <img src={dots} alt="" />
                                  }
                                  listId={list._id}
                                />
                              </div>
                            </div>
                            <div className="m-1.5">
                              {<CardComponent list={list} board={board} />}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {newList === false ? (
        <div className="flex items-start justify-start ">
          <button
            onClick={() => {
              setNewList(true);
            }}
            className={` bg-[#ffffff74] flex justify-start items-center text-[16px] font-bold w-[320px] rounded-lg transition-all duration-100`}
          >
            <span className="text-[30px] mx-4">+</span>Añadir una lista
          </button>
        </div>
      ) : (
        <div className="flex items-start justify-start">
          <div className="bg-[#000000c6] rounded-lg p-1 w-[320px] pr-3 pl-2">
            <input
              className="mx-1 my-1 w-full p-2 bg-transparent border-none text-[16px] font-bold "
              onChange={(event) => setNameList(event.target.value)}
              type="text"
              placeholder="Titulo de la lista"
              autoFocus
            />
            <div className="flex items-center justify-between my-1">
              <button
                onClick={() => handleNewList()}
                className={`flex items-center justify-start w-full p-2 rounded-lg transition-all duration-100 ${
                  nameList.trim() === ""
                    ? "bg-[#b2b2b2bc] cursor-not-allowed"
                    : "bg-[#0065FF]"
                }`}
                disabled={nameList.trim() === "" ? true : false}
              >
                Añadir lista
              </button>
              <button
                onClick={() => setNewList(false)}
                className="w-[30px] h-[30px] rounded-md hover:bg-[#ffffff4b] transition-all duration-100 mx-2 p-2"
              >
                <img src={close} alt="" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
