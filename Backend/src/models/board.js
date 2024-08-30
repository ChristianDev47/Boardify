import { Board } from "./database/schemas/schemasDB.js";

class BoardModel {
  // GET ALL
  static async getAll() {
    try {
      const boards = await Board.find()
        .populate("user_id")
        .populate("members.member_id")
        .exec();
      // specific fields
      // const boards = await Board.find().populate({path: 'user_id', select: 'username email'}).exec();
      return boards;
    } catch (error) {
      throw new Error("Error getting boards: ", error);
    }
  }

  // CREATE BOARD
  static async create({ board }) {
    try {
      const newBoard = await Board.create(board);
      await newBoard.populate("user_id");
      return newBoard;
    } catch (error) {
      throw new Error("Error creating board: ", error);
    }
  }

  // UPDATE BOARD
  static async update({ boardId, board }) {
    try {
      const updatedBoard = await Board.findByIdAndUpdate(boardId, board, {
        new: true,
        runValidators: true,
      });
      if (updatedBoard !== null) {
        await updatedBoard.populate("user_id");
        return updatedBoard;
      } else {
        throw new Error("Board not found");
      }
    } catch (error) {
      throw new Error("Error updating board: ", error);
    }
  }

  // DELETE BOARD
  static async delete({ boardId }) {
    try {
      const deletedBoard = await Board.findByIdAndDelete(boardId);
      if (deletedBoard !== null) {
        return { message: "Board deleted sucessfull" };
      } else {
        throw new Error("Board not found");
      }
    } catch (error) {
      throw new Error("Error deleting board: ", error);
    }
  }

  // FIND BOARD BY ID
  static async getById({ boardId }) {
    try {
      const board = await Board.findById(boardId)
        .populate("user_id")
        .populate("members.member_id")
        .exec();
      if (board !== null) {
        return board;
      } else {
        throw new Error("Board not found");
      }
    } catch (error) {
      throw new Error("Error getting board: ", error);
    }
  }

  // FIND BOARD BY USERID
  static async getByUserId({ userId }) {
    try {
      const boards = await Board.find({ user_id: userId })
        .populate("user_id")
        .populate("members.member_id")
        .exec();
      if (boards !== null) {
        return boards;
      } else {
        throw new Error("Boards not found");
      }
    } catch (error) {
      throw new Error("Error getting boards: ", error);
    }
  }

  // FIND BOARD BY MEMBERID
  static async getByMemberId({ memberId }) {
    try {
      const boards = await Board.find({ "members.member_id": memberId })
        .populate("user_id")
        .populate("members.member_id")
        .exec();
      if (boards !== null) {
        return boards;
      } else {
        throw new Error("Boards not found");
      }
    } catch (error) {
      throw new Error("Error getting boards: ", error);
    }
  }
}

export default BoardModel;
