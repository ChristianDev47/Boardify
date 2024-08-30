import { validatePartialBoardFile } from "../schemas/validations/boardFile.js";
import path from "node:path";
import { deleteOldBackgroundImage } from "../services/backgroundImage.js";

class BoardFileController {
  constructor({ boardFileModel }) {
    this.boardFileModel = boardFileModel;
  }

  getAll = async (req, res) => {
    try {
      const boardFiles = await this.boardFileModel.getAll();
      res.status(200).json(boardFiles);
    } catch (error) {
      console.error("Error getting boardFiles: ", error);
      res.status(404).json({ error: "Error getting boardFiles" });
    }
  };

  create = async (req, res) => {
    try {
      const data = req.body;
      // Upload Image
      if (req.file) {
        data.location = req.file.path;
        data.fileName = path.basename(req.file.path);
      }
      const result = validatePartialBoardFile(data);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newBoardFile = await this.boardFileModel.create({
        boardFile: result.data,
      });
      res.status(201).json(newBoardFile);
    } catch (error) {
      console.error("Error creating boardFile: ", error);
      res.status(404).json({ error: "Error creating boardFile" });
    }
  };

  update = async (req, res) => {
    try {
      const boardFileId = req.params.id;
      const result = validatePartialBoardFile(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const updatedBoardFile = await this.boardFileModel.update({
        boardFileId,
        boardFile: result.data,
      });
      res.status(200).json(updatedBoardFile);
    } catch (error) {
      console.error("Error updating boardFile: ", error);
      res.status(400).json({ error: "Error updating boardFile" });
    }
  };

  delete = async (req, res) => {
    try {
      const boardFileId = req.params.id;
      // File Verification and delete
      const myboardFile = await this.boardFileModel.getById({ boardFileId });
      deleteOldBackgroundImage(myboardFile);
      const boardFile = await this.boardFileModel.delete({ boardFileId });
      res.status(200).json(boardFile);
    } catch (error) {
      console.error("Error deleting boardFile: ", error);
      res.status(404).json({ error: "Error deleting boardFile" });
    }
  };

  getById = async (req, res) => {
    try {
      const boardFileId = req.params.id;
      const boardFiles = await this.boardFileModel.getById({ boardFileId });
      res.status(200).json(boardFiles);
    } catch (error) {
      console.error("Error getting boardFile: ", error);
      res.status(404).json({ error: "Error getting boardFile" });
    }
  };

  getByBoardId = async (req, res) => {
    try {
      const boardId = req.params.id;
      const boardFiles = await this.boardFileModel.getByBoardId({ boardId });
      res.status(200).json(boardFiles);
    } catch (error) {
      console.error("Error getting boardFiles: ", error);
      res.status(404).json({ error: "Error getting boardFiles" });
    }
  };
}

export default BoardFileController;
