import { validatePartialUserFile } from "../schemas/validations/userFile.js";
import { deleteOldProfileImage } from "../services/userImage.js";

class UserFileController {
  constructor({ userFileModel }) {
    this.userFileModel = userFileModel;
  }

  getAll = async (req, res) => {
    try {
      const userFiles = await this.userFileModel.getAll();
      res.status(200).json(userFiles);
    } catch (error) {
      console.error("Error getting userFiles: ", error);
      res.status(404).json({ error: "Error getting userFiles" });
    }
  };

  create = async (req, res) => {
    try {
      const data = req.body;

      let newFile = data;
      if (req.file) {
        newFile = {
          ...data,
          location: req.file.path,
        };
      }
      const result = validatePartialUserFile(newFile);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newUserFile = await this.userFileModel.create({
        userFile: result.data,
      });
      res.status(201).json(newUserFile);
    } catch (error) {
      console.error("Error creating userFile: ", error);
      res.status(404).json({ error: "Error creating userFile" });
    }
  };

  update = async (req, res) => {
    try {
      const userFileId = req.params.id;
      const result = validatePartialUserFile(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const updatedUserFile = await this.userFileModel.update({
        userFileId,
        userFile: result.data,
      });
      res.status(200).json(updatedUserFile);
    } catch (error) {
      console.error("Error updating userFile: ", error);
      res.status(400).json({ error: "Error updating userFile" });
    }
  };

  delete = async (req, res) => {
    try {
      const userFileId = req.params.id;
      // File Verification and delete
      const myuserFile = await this.userFileModel.getById({ userFileId });
      deleteOldProfileImage(myuserFile);
      const userFile = await this.userFileModel.delete({ userFileId });
      res.status(200).json(userFile);
    } catch (error) {
      console.error("Error deleting userFile: ", error);
      res.status(404).json({ error: "Error deleting userFile" });
    }
  };

  getById = async (req, res) => {
    try {
      const userFileId = req.params.id;
      const userFiles = await this.userFileModel.getById({ userFileId });
      res.status(200).json(userFiles);
    } catch (error) {
      console.error("Error getting userFile: ", error);
      res.status(404).json({ error: "Error getting userFile" });
    }
  };

  getByUserId = async (req, res) => {
    try {
      const userId = req.params.id;
      const userFiles = await this.userFileModel.getByUserId({ userId });
      res.status(200).json(userFiles);
    } catch (error) {
      console.error("Error getting userFiles: ", error);
      res.status(404).json({ error: "Error getting userFiles" });
    }
  };
}

export default UserFileController;
