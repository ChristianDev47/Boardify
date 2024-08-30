import { CardLabel } from "./database/schemas/schemasDB.js";

class CardLabelModel {
  // GET ALL
  static async getAll() {
    try {
      const cardLabels = await CardLabel.find().populate("card_id").exec();
      return cardLabels;
    } catch (error) {
      throw new Error("Error getting cardLabels: ", error);
    }
  }

  // CREATE CARD LABEL
  static async create({ cardLabel }) {
    try {
      const newCardLabel = await CardLabel.create(cardLabel);
      await newCardLabel.populate("card_id");
      return newCardLabel;
    } catch (error) {
      throw new Error("Error creating cardLabel: ", error);
    }
  }

  // UPDATE CARD LABEL
  static async update({ cardLabelId, cardLabel }) {
    try {
      const updatedCardLabel = await CardLabel.findByIdAndUpdate(
        cardLabelId,
        cardLabel,
        { new: true, runValidators: true }
      );
      if (updatedCardLabel !== null) {
        await updatedCardLabel.populate("card_id");
        return updatedCardLabel;
      } else {
        throw new Error("CardLabel not found");
      }
    } catch (error) {
      throw new Error("Error updating cardLabel: ", error);
    }
  }

  // DELETE CARD LABEL
  static async delete({ cardLabelId }) {
    try {
      const deletedCardLabel = await CardLabel.findByIdAndDelete(cardLabelId);
      if (deletedCardLabel !== null) {
        return { message: "CardLabel deleted sucessfull" };
      } else {
        throw new Error("CardLabel not found");
      }
    } catch (error) {
      throw new Error("Error deleting cardLabel: ", error);
    }
  }

  // FIND CARD LABEL BY ID
  static async getById({ cardLabelId }) {
    try {
      const cardLabel = await CardLabel.findById(cardLabelId)
        .populate("card_id")
        .exec();
      if (cardLabel !== null) {
        return cardLabel;
      } else {
        throw new Error("CardLabel not found");
      }
    } catch (error) {
      throw new Error("Error getting cardLabel: ", error);
    }
  }

  // FIND CARD LABEL BY CARD ID
  static async getByCardId({ cardId }) {
    try {
      const cardLabels = await CardLabel.find({ card_id: cardId })
        .populate("card_id")
        .exec();
      if (cardLabels !== null) {
        return cardLabels;
      } else {
        throw new Error("CardLabels not found");
      }
    } catch (error) {
      throw new Error("Error getting cardLabels: ", error);
    }
  }
}

export default CardLabelModel;
