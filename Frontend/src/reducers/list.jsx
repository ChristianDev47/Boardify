export const LIST_ACTION_TYPES = {
  GET_LIST_BY_BOARD: "GET_LIST_BY_BOARD",
  CREATE_LIST: "CREATE_LIST",
  UPDATE_LIST: "UPDATE_LIST",
  UPDATE_LIST_DATA: "UPDATE_LIST_DATA",
  DELETE_LIST: "DELETE_LIST",
  GET_LIST_ACTIVITY: "GET_LIST_ACTIVITY",
};

const UPDATE_STATE_BY_ACTION = {
  [LIST_ACTION_TYPES.GET_LIST_BY_BOARD]: (state, action) => {
    return {
      ...state,
      lists: action.payload,
    };
  },
  [LIST_ACTION_TYPES.CREATE_LIST]: (state, action) => {
    return {
      ...state,
      lists: [...state.lists, action.payload],
    };
  },
  [LIST_ACTION_TYPES.UPDATE_LIST]: (state, action) => {
    const { id, list } = action.payload;
    const newListData = state.lists.map((mylist) => {
      if (mylist._id === id) {
        return list;
      } else {
        return mylist;
      }
    });
    return {
      ...state,
      lists: newListData,
    };
  },
  [LIST_ACTION_TYPES.DELETE_LIST]: (state, action) => {
    const id = action.payload;
    const newListData = state.lists.filter((list) => list._id !== id);
    return {
      ...state,
      lists: newListData,
    };
  },
  [LIST_ACTION_TYPES.UPDATE_LIST_DATA]: (state, action) => {
    return {
      ...state,
      lists: action.payload,
    };
  },
};

export const listReducer = (state, action) => {
  const { type: actionType } = action;
  const updateState = UPDATE_STATE_BY_ACTION[actionType];
  return updateState ? updateState(state, action) : state;
};
