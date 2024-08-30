import { BoardActivity } from "./database/schemas/schemasDB.js";

class BoardActivityModel {
  // GET ALL
  static async getAll() {
    try {
      const boardActivities = await BoardActivity.find()
        .populate("user_id")
        .exec();
      return boardActivities;
    } catch (error) {
      throw new Error("Error getting boardActivities: ", error);
    }
  }

  // CREATE BOARD ACTIVITY
  static async create({ boardActivity }) {
    try {
      const newBoardActivity = await BoardActivity.create(boardActivity);
      await newBoardActivity.populate("board_id", "user_id");
      return newBoardActivity;
    } catch (error) {
      throw new Error("Error creating boardActivity: ", error);
    }
  }

  // GET BY BOARD ID
  static async getByBoardId({ boardId }) {
    try {
      const boardActivities = await BoardActivity.find({ board_id: boardId })
        .populate("user_id")
        .exec();
      return boardActivities;
    } catch (error) {
      throw new Error("Error getting boardActivities: ", error);
    }
  }
}

export default BoardActivityModel;
