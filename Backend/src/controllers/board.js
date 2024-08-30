import {
  validateBoard,
  validatePartialBoard,
} from "../schemas/validations/board.js";
import BoardActivityModel from "../models/boardActivity.js";
import { deleteOldBoardBackgroundImage } from "../services/backgroundImage.js";
import { decompress } from "../services/decodeUser.js";

class BoardController {
  constructor({ boardModel }) {
    this.boardModel = boardModel;
  }

  getAll = async (req, res) => {
    try {
      const boards = await this.boardModel.getAll();
      res.status(200).json(boards);
    } catch (error) {
      console.error("Error getting boards: ", error);
      res.status(404).json({ error: "Error getting boards" });
    }
  };

  create = async (req, res) => {
    try {
      const result = validateBoard(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newBoard = await this.boardModel.create({ board: result.data });
      // Save action create in the history
      const { user } = req.cookies;
      const userData = decompress(user);
      const user_id = userData.id;
      if (user_id) {
        const myActivity = {
          user_id,
          activity: `ha creado este tablero`,
          board_id: newBoard.id,
        };
        await BoardActivityModel.create({ boardActivity: myActivity });
      }
      res.status(201).json(newBoard);
    } catch (error) {
      console.error("Error creating board: ", error);
      res.status(404).json({ error: "Error creating board" });
    }
  };

  update = async (req, res) => {
    try {
      const boardId = req.params.id;
      const result = validatePartialBoard(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      let data = result.data;
      const oldBoard = await this.boardModel.getById({ boardId });
      const updatedBoard = await this.boardModel.update({
        boardId,
        board: data,
      });
      // Save action create in the history
      const { user } = req.cookies;
      const userData = decompress(user);
      const user_id = userData.id;
      if (user_id && data.title) {
        const myActivity = {
          user_id,
          activity: `ha renombrado este tablero (de ${oldBoard.title} a ${updatedBoard.title})`,
          board_id: updatedBoard.id,
        };
        await BoardActivityModel.create({ boardActivity: myActivity });
      }
      if (user_id && data.background) {
        const myActivity = {
          user_id,
          activity: `ha cambiado la portada de este tablero`,
          board_id: updatedBoard.id,
        };
        await BoardActivityModel.create({ boardActivity: myActivity });
      }
      res.status(200).json(updatedBoard);
    } catch (error) {
      console.error("Error updating board: ", error);
      res.status(400).json({ error: "Error updating board" });
    }
  };

  delete = async (req, res) => {
    try {
      const boardId = req.params.id;
      const board = await this.boardModel.getById({ boardId });
      if (board.background.includes("http")) {
        // Getting old image to delete
        deleteOldBoardBackgroundImage(board);
      }
      const deletedboard = await this.boardModel.delete({ boardId });
      res.status(200).json(deletedboard);
    } catch (error) {
      console.error("Error deleting board: ", error);
      res.status(404).json({ error: "Error deleting board" });
    }
  };

  getById = async (req, res) => {
    try {
      const boardId = req.params.id;
      const boards = await this.boardModel.getById({ boardId });
      res.status(200).json(boards);
    } catch (error) {
      console.error("Error getting board: ", error);
      res.status(404).json({ error: "Error getting board" });
    }
  };

  getByUserId = async (req, res) => {
    try {
      const userId = req.params.id;
      const boards = await this.boardModel.getByUserId({ userId });
      res.status(200).json(boards);
    } catch (error) {
      console.error("Error getting boards: ", error);
      res.status(404).json({ error: "Error getting boards" });
    }
  };

  getByMemberId = async (req, res) => {
    try {
      const memberId = req.params.id;
      const boards = await this.boardModel.getByMemberId({ memberId });
      res.status(200).json(boards);
    } catch (error) {
      console.error("Error getting boards: ", error);
      res.status(404).json({ error: "Error getting boards" });
    }
  };
}

export default BoardController;
