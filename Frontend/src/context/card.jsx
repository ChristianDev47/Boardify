/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { cardReducer } from "../reducers/card.jsx";
import {
  CreateCard,
  DeleteCard,
  GetCardById,
  GetCardByList,
  GetCardFilesByCard,
  GetCheckItemsByCard,
  GetLabelByCard,
  UpdateCards,
} from "../services/project.jsx";

export const CardContext = createContext();

const cardInitialState = {
  cards: {},
  myCard: {},
  cardActivities: [],
};

function useCards() {
  const [state, dispatch] = useReducer(cardReducer, cardInitialState);

  const getCardByList = async (listId) => {
    const cards = await GetCardByList({ listId });
    if (cards) {
      const newData = await Promise.all(
        cards
          .filter((card) => card.list_id._id === listId)
          .map(async (card) => {
            const labels = await GetLabelByCard({ cardId: card._id });
            labels.filter((label) => label.is_active === true);
            const files = await GetCardFilesByCard({ cardId: card._id });
            const checkItems = await GetCheckItemsByCard({ cardId: card._id });
            const checkItemsCompleted = checkItems.filter(
              (item) => item.is_checked
            );
            const myMembers = await GetCardById({ cardId: card._id });
            const listId = {
              ...card,
              background: card.background,
              filename: card.background,
              labels,
              files: files,
              checkItems: checkItems,
              checkItemsCompleted: checkItemsCompleted.length,
              members: myMembers.members,
            };
            return listId;
          })
      );
      return newData;
    }
  };
  const createCard = async (data) => {
    const card = await CreateCard({ card: data });
    const myCard = {
      ...card,
      background: card.background,
      filename: card.background,
      labels: [],
      files: [],
      checkItems: [],
      checkItemsCompleted: 0,
      members: [],
    };

    dispatch({ type: "CREATE_CARD", payload: myCard });
  };
  const updateCard = async (id, data) => {
    const card = await UpdateCards({ id, data });
    return card;
  };
  const deleteCard = async (id) => {
    await DeleteCard({ id });
    dispatch({ type: "DELETE_CARD", payload: id });
  };
  const getCardActivity = async () => {
    const card = await GetCardByList({});
    dispatch({ type: "GET_CARD_ACTIVITY", payload: card });
  };

  const updateCardData = async (data) => {
    dispatch({ type: "UPDATE_CARD_DATA", payload: data });
  };

  const updateCardDataByList = async (listId) => {
    const cards = state.cards[listId.toString()];
    if (cards) {
      const newData = await Promise.all(
        cards
          .filter((card) => card.list_id._id === listId)
          .map(async (card) => {
            const labels = await GetLabelByCard({ cardId: card._id });
            labels.filter((label) => label.is_active === true);
            const files = await GetCardFilesByCard({ cardId: card._id });
            const checkItems = await GetCheckItemsByCard({ cardId: card._id });
            const checkItemsCompleted = checkItems.filter(
              (item) => item.is_checked
            );

            const myMembers = await GetCardById({ cardId: card._id });
            const listId = {
              ...card,
              background: card.background,
              filename: card.background,
              labels,
              files: files,
              checkItems: checkItems,
              checkItemsCompleted: checkItemsCompleted.length,
              members: myMembers.members,
            };
            return listId;
          })
      );
      dispatch({
        type: "UPDATE_CARD_BY_LIST",
        payload: { newCards: newData, listId },
      });
    }
  };

  const updateAllCardData = async (card) => {
    dispatch({ type: "UPDATE_ALL_CARDS_DATA", payload: card });
  };

  const addMyCard = async (listId, cardId) => {
    dispatch({ type: "ADD_MY_CARD", payload: { listId, cardId } });
  };

  const clearMyCard = async () => {
    dispatch({ type: "CLEAR_MY_CARD", payload: {} });
  };

  return {
    state,
    getCardByList,
    createCard,
    updateCard,
    deleteCard,
    getCardActivity,
    updateCardData,
    updateCardDataByList,
    addMyCard,
    clearMyCard,
    updateAllCardData,
  };
}

export function CardProvider({ children }) {
  const {
    state,
    getCardByList,
    createCard,
    updateCard,
    deleteCard,
    getCardActivity,
    updateCardData,
    updateCardDataByList,
    addMyCard,
    clearMyCard,
    updateAllCardData,
  } = useCards();

  return (
    <CardContext.Provider
      value={{
        cardsAllData: state,
        getCardByList,
        createCard,
        updateCard,
        deleteCard,
        getCardActivity,
        updateCardData,
        updateCardDataByList,
        addMyCard,
        clearMyCard,
        updateAllCardData,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

CardProvider.propTypes = {
  children: PropTypes.node,
};
