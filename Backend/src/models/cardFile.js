import { CardFile } from "./database/schemas/schemasDB.js";

class CardFileModel {
  // GET ALL
  static async getAll() {
    try {
      const cardFiles = await CardFile.find().populate("card_id").exec();
      return cardFiles;
    } catch (error) {
      throw new Error("Error getting cardFiles: ", error);
    }
  }

  // CREATE CARD FILE
  static async create({ cardFile }) {
    try {
      const newCardFile = await CardFile.create(cardFile);
      await newCardFile.populate("card_id");
      return newCardFile;
    } catch (error) {
      throw new Error("Error creating cardFile: ", error);
    }
  }

  // UPDATE CARD FILE
  static async update({ cardFileId, cardFile }) {
    try {
      const updatedCardFile = await CardFile.findByIdAndUpdate(
        cardFileId,
        cardFile,
        { new: true, runValidators: true }
      );
      if (updatedCardFile !== null) {
        await updatedCardFile.populate("card_id");
        return updatedCardFile;
      } else {
        throw new Error("CardFile not found");
      }
    } catch (error) {
      throw new Error("Error updating cardFile: ", error);
    }
  }

  // DELETE CARD FILE
  static async delete({ cardFileId }) {
    try {
      const deletedCardFile = await CardFile.findByIdAndDelete(cardFileId);
      if (deletedCardFile !== null) {
        return { message: "CardFile deleted sucessfull" };
      } else {
        throw new Error("CardFile not found");
      }
    } catch (error) {
      throw new Error("Error deleting cardFile: ", error);
    }
  }

  // FIND CARD FILE BY ID
  static async getById({ cardFileId }) {
    try {
      const cardFile = await CardFile.findById(cardFileId)
        .populate("card_id")
        .exec();
      if (cardFile !== null) {
        return cardFile;
      } else {
        throw new Error("CardFile not found");
      }
    } catch (error) {
      throw new Error("Error getting cardFile: ", error);
    }
  }

  // FIND CARD FILE BY CARD ID
  static async getByCardId({ cardId }) {
    try {
      const cardFiles = await CardFile.find({ card_id: cardId })
        .populate("card_id")
        .exec();
      if (cardFiles !== null) {
        return cardFiles;
      } else {
        throw new Error("CardFiles not found");
      }
    } catch (error) {
      throw new Error("Error getting cardFiles: ", error);
    }
  }
}

export default CardFileModel;
