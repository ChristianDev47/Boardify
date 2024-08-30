import { UserFile } from "./database/schemas/schemasDB.js";

class UserFileModel {
  // GET ALL
  static async getAll() {
    try {
      const userFiles = await UserFile.find().populate("user_id").exec();
      return userFiles;
    } catch (error) {
      throw new Error("Error getting userFiles: ", error);
    }
  }

  // CREATE USER FILE
  static async create({ userFile }) {
    try {
      const newUserFile = await UserFile.create(userFile);
      await newUserFile.populate("user_id");
      return newUserFile;
    } catch (error) {
      throw new Error("Error creating userFile: ", error);
    }
  }

  // UPDATE USER FILE
  static async update({ userFileId, userFile }) {
    try {
      const updatedUserFile = await UserFile.findByIdAndUpdate(
        userFileId,
        userFile,
        { new: true, runValidators: true }
      );
      if (updatedUserFile !== null) {
        await updatedUserFile.populate("user_id");
        return updatedUserFile;
      } else {
        throw new Error("UserFile not found");
      }
    } catch (error) {
      throw new Error("Error updating userFile: ", error);
    }
  }

  // DELETE USER FILE
  static async delete({ userFileId }) {
    try {
      const deletedUserFile = await UserFile.findByIdAndDelete(userFileId);
      if (deletedUserFile !== null) {
        return { message: "UserFile deleted sucessfull" };
      } else {
        throw new Error("UserFile not found");
      }
    } catch (error) {
      throw new Error("Error deleting userFile: ", error);
    }
  }

  // FIND USER FILE BY ID
  static async getById({ userFileId }) {
    try {
      const userFile = await UserFile.findById(userFileId)
        .populate("user_id")
        .exec();
      if (userFile !== null) {
        return userFile;
      } else {
        throw new Error("UserFile not found");
      }
    } catch (error) {
      throw new Error("Error getting userFile: ", error);
    }
  }

  // FIND USER FILE BY USER ID
  static async getByUserId({ userId }) {
    try {
      const userFiles = await UserFile.find({ user_id: userId })
        .populate("user_id")
        .exec();
      if (userFiles !== null) {
        return userFiles;
      } else {
        throw new Error("UserFiles not found");
      }
    } catch (error) {
      throw new Error("Error getting userFiles: ", error);
    }
  }
}

export default UserFileModel;
