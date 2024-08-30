import { validatePartialCardFile } from "../schemas/validations/cardFile.js";
import path from "node:path";
import CardActivityModel from "../models/cardActivity.js";
import { deleteOldFiles } from "../services/files.js";
import { decompress } from "../services/decodeUser.js";

class CardFileController {
  constructor({ cardFileModel }) {
    this.cardFileModel = cardFileModel;
  }

  getAll = async (req, res) => {
    try {
      const cardFiles = await this.cardFileModel.getAll();
      res.status(200).json(cardFiles);
    } catch (error) {
      console.error("Error getting cardFiles: ", error);
      res.status(404).json({ error: "Error getting cardFiles" });
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
      const result = validatePartialCardFile(data);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newCardFile = await this.cardFileModel.create({
        cardFile: result.data,
      });
      // Save activity
      const { user } = req.cookies;
      const userData = decompress(user);
      const user_id = userData.id;
      if (user_id && req.file) {
        const cardId = newCardFile.card_id._id.toString();
        const myActivity = {
          user_id,
          activity: `ha adjuntado ${path.basename(newCardFile.location)} a ${
            newCardFile.card_id.name
          }`,
          cardActivity: `ha adjuntado ${path.basename(
            newCardFile.location
          )} a esta tarjeta`,
          card_id: cardId,
        };
        await CardActivityModel.create({ cardActivity: myActivity });
      }
      res.status(201).json(newCardFile);
    } catch (error) {
      console.error("Error creating cardFile: ", error);
      res.status(404).json({ error: "Error creating cardFile" });
    }
  };

  update = async (req, res) => {
    try {
      const cardFileId = req.params.id;
      const result = validatePartialCardFile(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const updatedCardFile = await this.cardFileModel.update({
        cardFileId,
        cardFile: result.data,
      });
      res.status(200).json(updatedCardFile);
    } catch (error) {
      console.error("Error updating cardFile: ", error);
      res.status(400).json({ error: "Error updating cardFile" });
    }
  };

  delete = async (req, res) => {
    try {
      const cardFileId = req.params.id;
      // File Verification and delete
      const mycardFile = await this.cardFileModel.getById({ cardFileId });
      deleteOldFiles(mycardFile);
      const cardFile = await this.cardFileModel.delete({ cardFileId });
      // Save activity
      const { user } = req.cookies;
      const userData = decompress(user);
      const user_id = userData.id;
      if (user_id) {
        const cardId = mycardFile.card_id._id.toString();
        const myActivity = {
          user_id,
          activity: `ha quitado ${path.basename(mycardFile.location)} de ${
            mycardFile.card_id.name
          }`,
          cardActivity: `ha quitado ${path.basename(
            mycardFile.location
          )} de esta tarjeta`,
          card_id: cardId,
        };
        await CardActivityModel.create({ cardActivity: myActivity });
      }
      res.status(200).json(cardFile);
    } catch (error) {
      console.error("Error deleting cardFile: ", error);
      res.status(404).json({ error: "Error deleting cardFile" });
    }
  };

  getById = async (req, res) => {
    try {
      const cardFileId = req.params.id;
      const cardFiles = await this.cardFileModel.getById({ cardFileId });
      res.status(200).json(cardFiles);
    } catch (error) {
      console.error("Error getting cardFile: ", error);
      res.status(404).json({ error: "Error getting cardFile" });
    }
  };

  getByCardId = async (req, res) => {
    try {
      const cardId = req.params.id;
      const cardFiles = await this.cardFileModel.getByCardId({ cardId });
      res.status(200).json(cardFiles);
    } catch (error) {
      console.error("Error getting cardFiles: ", error);
      res.status(404).json({ error: "Error getting cardFiles" });
    }
  };
}

export default CardFileController;
