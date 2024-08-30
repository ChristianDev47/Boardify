export const LIST_ACTION_TYPES = {
  CREATE_CARD: "CREATE_CARD",
  UPDATE_CARD_DATA: "UPDATE_CARD_DATA",
  UPDATE_MY_CARD: "UPDATE_MY_CARD",
  UPDATE_ALL_CARDS_DATA: "UPDATE_ALL_CARDS_DATA",
  UPDATE_CARD_BY_LIST: "UPDATE_CARD_BY_LIST",
  DELETE_CARD: "DELETE_CARD",
  GET_CARD_ACTIVITY: "GET_CARD_ACTIVITY",
  ADD_MY_CARD: "ADD_MY_CARD",
  CLEAR_MY_CARD: "CLEAR_MY_CARD",
};

const UPDATE_STATE_BY_ACTION = {
  [LIST_ACTION_TYPES.CREATE_CARD]: (state, action) => {
    const newCard = action.payload;
    const listId = newCard.list_id._id.toString();
    return {
      ...state,
      cards: {
        ...state.cards,
        [listId]: state.cards[listId]
          ? [...state.cards[listId], newCard]
          : [newCard],
      },
    };
  },
  [LIST_ACTION_TYPES.ADD_MY_CARD]: (state, action) => {
    const { listId, cardId } = action.payload;
    const mycard = state.cards[listId.toString()].find(
      (card) => card._id === cardId
    );
    return {
      ...state,
      myCard: mycard,
    };
  },
  [LIST_ACTION_TYPES.CLEAR_MY_CARD]: (state, action) => {

    return {
      ...state,
      myCard: action.payload,
    };
  },
  [LIST_ACTION_TYPES.UPDATE_CARD_BY_LIST]: (state, action) => {
    const { listId, newCards } = action.payload;
    return {
      ...state,
      cards: {
        ...state.cards,
        [listId]: newCards,
      },
    };
  },
  [LIST_ACTION_TYPES.UPDATE_CARD_DATA]: (state, action) => {
    return {
      ...state,
      cards: action.payload,
    };
  },
  [LIST_ACTION_TYPES.UPDATE_ALL_CARDS_DATA]: (state, action) => {
    const card = action.payload;
    const listId = card.list_id._id.toString();
    return {
      ...state,
      cards: {
        ...state.cards,
        [listId]: [
          ...state.cards[listId].map((mycard) => {
            if (mycard._id === card._id) {
              return card;
            }
            return mycard;
          }),
        ],
      },
    };
  },
  [LIST_ACTION_TYPES.DELETE_CARD]: (state, action) => {
    const id = action.payload;
    const newListData = state.cards.filter((card) => card._id !== id);
    return {
      ...state,
      cards: [newListData],
    };
  },
};

export const cardReducer = (state, action) => {
  const { type: actionType } = action;
  const updateState = UPDATE_STATE_BY_ACTION[actionType];
  return updateState ? updateState(state, action) : state;
};
