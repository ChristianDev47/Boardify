import { CardActivity } from "./database/schemas/schemasDB.js";

class CardActivityModel {
  // GET ALL
  static async getAll() {
    try {
      const cardActivities = await CardActivity.find()
        .populate("user_id")
        .exec();
      return cardActivities;
    } catch (error) {
      throw new Error("Error getting cardActivities: ", error);
    }
  }

  // CREATE BOARD
  static async create({ cardActivity }) {
    try {
      const newCardActivity = await CardActivity.create(cardActivity);
      await newCardActivity.populate("card_id", "user_id");
      return newCardActivity;
    } catch (error) {
      throw new Error("Error creating cardActivity: ", error);
    }
  }

  // GET BY CARD ID
  static async getByCardId({ cardId }) {
    try {
      const cardActivities = await CardActivity.find({ card_id: cardId })
        .populate("user_id")
        .exec();
      return cardActivities;
    } catch (error) {
      throw new Error("Error getting cardActivities: ", error);
    }
  }
}

export default CardActivityModel;
