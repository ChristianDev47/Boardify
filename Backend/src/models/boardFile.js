import { BoardFile } from "./database/schemas/schemasDB.js";

class BoardFileModel {
  // GET ALL
  static async getAll() {
    try {
      const boardFiles = await BoardFile.find().populate("board_id").exec();
      return boardFiles;
    } catch (error) {
      throw new Error("Error getting boardFiles: ", error);
    }
  }

  // CREATE BOARD FILE
  static async create({ boardFile }) {
    try {
      const newBoardFile = await BoardFile.create(boardFile);
      await newBoardFile.populate("board_id");
      return newBoardFile;
    } catch (error) {
      throw new Error("Error creating boardFile: ", error);
    }
  }

  // UPDATE BOARD FILE
  static async update({ boardFileId, boardFile }) {
    try {
      const updatedBoardFile = await BoardFile.findByIdAndUpdate(
        boardFileId,
        boardFile,
        { new: true, runValidators: true }
      );
      if (updatedBoardFile !== null) {
        await updatedBoardFile.populate("board_id");
        return updatedBoardFile;
      } else {
        throw new Error("BoardFile not found");
      }
    } catch (error) {
      throw new Error("Error updating boardFile: ", error);
    }
  }

  // DELETE BOARD FILE
  static async delete({ boardFileId }) {
    try {
      const deletedBoardFile = await BoardFile.findByIdAndDelete(boardFileId);
      if (deletedBoardFile !== null) {
        return { message: "BoardFile deleted sucessfull" };
      } else {
        throw new Error("BoardFile not found");
      }
    } catch (error) {
      throw new Error("Error deleting boardFile: ", error);
    }
  }

  // FIND BOARD FILE BY ID
  static async getById({ boardFileId }) {
    try {
      const boardFile = await BoardFile.findById(boardFileId)
        .populate("board_id")
        .exec();
      if (boardFile !== null) {
        return boardFile;
      } else {
        throw new Error("BoardFile not found");
      }
    } catch (error) {
      throw new Error("Error getting boardFile: ", error);
    }
  }

  // FIND BOARD FILE BY BOARD ID
  static async getByBoardId({ boardId }) {
    try {
      const boardFiles = await BoardFile.find({ board_id: boardId })
        .populate("board_id")
        .exec();
      if (boardFiles !== null) {
        return boardFiles;
      } else {
        throw new Error("BoardFiles not found");
      }
    } catch (error) {
      throw new Error("Error getting boardFiles: ", error);
    }
  }
}

export default BoardFileModel;
