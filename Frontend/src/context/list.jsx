/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { listReducer } from "../reducers/list.jsx";
import { useAuth } from "../hook/useAuth.jsx";
import {
  CreateList,
  DeleteList,
  GetListsByBoard,
  UpdateList,
} from "../services/project.jsx";

export const ListContext = createContext();

const listInitialState = {
  lists: [],
  listActivities: [],
};

function useLists() {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(listReducer, listInitialState);

  const getListByBoard = async (boardId) => {
    const lists = await GetListsByBoard({ boardId });
    lists.sort((a, b) => a.position - b.position);
    dispatch({ type: "GET_LIST_BY_BOARD", payload: lists });
    return lists;
  };
  const createList = async (data) => {
    const list = await CreateList({ list: data });
    dispatch({ type: "CREATE_LIST", payload: list });
    return list;
  };
  const updateList = async (id, data) => {
    const list = await UpdateList({ id, data });
    dispatch({ type: "UPDATE_LIST", payload: { id, list } });
  };

  const deleteList = async (id) => {
    await DeleteList({ id });
    dispatch({ type: "DELETE_LIST", payload: id });
  };
  const getListActivity = async () => {
    const list = await GetListsByBoard({ iduser: user.id });
    dispatch({ type: "GET_LIST_ACTIVITY", payload: list });
  };

  const updateListData = async (data) => {
    dispatch({ type: "UPDATE_LIST_DATA", payload: data });
  };

  return {
    state,
    getListByBoard,
    createList,
    updateList,
    deleteList,
    getListActivity,
    updateListData,
  };
}

export function ListProvider({ children }) {
  const {
    state,
    getListByBoard,
    createList,
    updateList,
    deleteList,
    getListActivity,
    updateListData,
  } = useLists();

  return (
    <ListContext.Provider
      value={{
        listsData: state,
        getListByBoard,
        createList,
        updateList,
        deleteList,
        getListActivity,
        updateListData,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

ListProvider.propTypes = {
  children: PropTypes.node,
};
