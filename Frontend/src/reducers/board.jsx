export const BOARD_ACTION_TYPES = {
  // Boards
  GET_BOARD_BY_USER: "GET_BOARD_BY_USER",
  GET_BOARD_BY_ID: "GET_BOARD_BY_ID",
  ADD_BOARD: "ADD_BOARD",
  UPDATE_BOARD: "UPDATE_BOARD",
  DELETE_BOARD: "DELETE_BOARD",

  // Members
  GET_COLABORATIVE_BOARDS: "GET_COLABORATIVE_BOARDS",
  ALL_BOARDS_MEMBER: "ALL_BOARDS_MEMBER",
  ADD_BOARD_MEMBER: "ADD_BOARD_MEMBER",
  DELETE_MEMBERES_BY_BOARD: "DELETE_MEMBERES_BY_BOARD",
};

const UPDATE_STATE_BY_ACTION = {
  [BOARD_ACTION_TYPES.GET_BOARD_BY_USER]: (state, action) => {
    return {
      ...state,
      boards: action.payload,
    };
  },
  [BOARD_ACTION_TYPES.GET_BOARD_BY_ID]: (state, action) => {
    return {
      ...state,
      myBoard: action.payload,
    };
  },
  [BOARD_ACTION_TYPES.ADD_BOARD]: (state, action) => {
    return {
      ...state,
      boards: [...state.boards, action.payload],
    };
  },
  [BOARD_ACTION_TYPES.UPDATE_BOARD]: (state, action) => {
    return {
      ...state,
      myBoard: action.payload,
      boards: state.boards.map((board) => {
        if (board.id === action.payload.id) {
          return action.payload;
        }
        return board;
      }),
    };
  },
  [BOARD_ACTION_TYPES.DELETE_BOARD]: (state, action) => {
    const id = action.payload;
    const newData = [];
    for (const board of state.boards) {
      if (board.id !== id) {
        newData.push(board);
      }
    }
    return {
      ...state,
      boards: newData,
    };
  },

  // Members

  [BOARD_ACTION_TYPES.GET_COLABORATIVE_BOARDS]: (state, action) => {
    const { boards } = action.payload;
    const boardsUnique = [];
    for (const board of boards) {
      if (board.members.length > 1) {
        boardsUnique.push(board);
      }
    }

    const myBoards = [...boardsUnique];

    const memberCounts = {};
    myBoards.forEach((board) => {
      board.members.forEach((member) => {
        const memberId = member.member_id.id;
        memberCounts[memberId] = (memberCounts[memberId] || 0) + 1;
      });
    });

    const myMembers = myBoards.flatMap((board) =>
      board.members.map((member) => {
        delete member._id;
        const memberId = member.member_id.id;
        return {
          ...member,
          numBoards: memberCounts[memberId],
        };
      })
    );

    const uniqueMembers = myMembers.filter(
      (obj, index, self) =>
        index ===
        self.findIndex((o) => o.member_id.email === obj.member_id.email)
    );
    return {
      ...state,
      colaborativeBoards: myBoards,
      boardMembers: uniqueMembers,
    };
  },
  [BOARD_ACTION_TYPES.ALL_BOARDS_MEMBER]: (state) => {
    const allboards = [...state.boards, ...state.colaborativeBoards];
    const uniqueBoards = allboards.filter(
      (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
    );
    return {
      ...state,
      allBoardsByMembers: uniqueBoards,
    };
  },

  [BOARD_ACTION_TYPES.ADD_BOARD_MEMBER]: (state) => {
    return {
      ...state,
      allBoardsByMembers: [...state.boards, ...state.colaborativeBoards],
    };
  },
  [BOARD_ACTION_TYPES.DELETE_MEMBERES_BY_BOARD]: (state, action) => {
    return {
      ...state,
      boardMembers: action.payload,
    };
  },
};

export const boardReducer = (state, action) => {
  const { type: actionType } = action;
  const updateState = UPDATE_STATE_BY_ACTION[actionType];
  return updateState ? updateState(state, action) : state;
};
