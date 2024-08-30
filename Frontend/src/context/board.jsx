/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { boardReducer } from "../reducers/board.jsx";
import { useAuth } from "../hook/useAuth.jsx";
import {
  CreateBoard,
  DeleteBoard,
  GetBoardById,
  GetBoardsByMember,
  GetBoardsByUser,
  UpdateBoard,
} from "../services/project.jsx";

export const BoardContext = createContext();

const boardInitialState = {
  boards: [],
  boardMembers: [],
  colaborativeBoards: [],
  allBoardsByMembers: [],
  myBoard: {},
};

function useBoards() {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(boardReducer, boardInitialState);

  // BOARDS
  const getBoarsdByUser = async () => {
    const board = await GetBoardsByUser({ iduser: user.id });
    dispatch({ type: "GET_BOARD_BY_USER", payload: board });
  };

  const addBoard = async (name, bg) => {
    if (name.trim() !== "") {
      const myBoard = {
        title: name.trim(),
        state: true,
        background: bg,
        user_id: user.id,
        board_permissions: "Administradores",
        allow_background: true,
        members: [
          { member_id: user.id, role: "administrador", permissions: ["all"] },
        ],
      };
      const board = await CreateBoard({ board: myBoard });
      dispatch({ type: "ADD_BOARD", payload: board });
      return board;
    }
  };

  const getBoardById = async (id) => {
    const board = await GetBoardById({ id });
    dispatch({ type: "GET_BOARD_BY_ID", payload: board });
  };

  const updateBoards = async (id, boardData) => {
    const board = await UpdateBoard({ id, data: boardData });
    dispatch({ type: "UPDATE_BOARD", payload: board });
  };

  const deleteBoard = async (board) => {
    await DeleteBoard({ id: board.id });
    dispatch({ type: "DELETE_BOARD", payload: board.id });
  };

  // MEMBERS
  const getColaborativeBoards = async () => {
    const board = await GetBoardsByMember({ memberId: user.id });
    dispatch({
      type: "GET_COLABORATIVE_BOARDS",
      payload: { boards: board, userId: user.id },
    });
  };

  const getAllBoardsByMembers = () => {
    dispatch({ type: "ALL_BOARDS_MEMBER" });
  };

  const addBoardMember = (board) => {
    dispatch({ type: "ADD_BOARD_MEMBER", payload: board });
  };

  const deleteMemberByBoard = async (boardId, userId) => {
    const myBoard = await GetBoardById({ id: boardId });
    const newData = myBoard.members.filter(
      (member) => member.member_id.id !== userId
    );
    await UpdateBoard({ id: boardId, data: { members: newData } });
  };

  useEffect(() => {
    if (Object.entries(user).length > 0) {
      getBoarsdByUser();
    }
  }, [user]);

  return {
    state,
    getBoarsdByUser,
    getBoardById,
    getColaborativeBoards,
    addBoard,
    updateBoards,
    getAllBoardsByMembers,
    addBoardMember,
    deleteMemberByBoard,
    deleteBoard,
  };
}

export function BoardProvider({ children }) {
  const { state, ...boardFunctions } = useBoards();

  return (
    <BoardContext.Provider value={{ myBoardInfo: state, ...boardFunctions }}>
      {children}
    </BoardContext.Provider>
  );
}

BoardProvider.propTypes = {
  children: PropTypes.node,
};
