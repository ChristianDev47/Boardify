import { Card } from "./database/schemas/schemasDB.js";

class CardModel {
  // GET ALL
  static async getAll() {
    try {
      const cards = await Card.find()
        .populate("list_id")
        .populate("members.member_id")
        .exec();
      return cards;
    } catch (error) {
      throw new Error("Error getting cards: ", error);
    }
  }

  // CREATE CARD
  static async create({ card }) {
    try {
      const newCard = await Card.create(card);
      await newCard.populate("list_id");
      return newCard;
    } catch (error) {
      throw new Error("Error creating card: ", error);
    }
  }

  // UPDATE CARD
  static async update({ cardId, card }) {
    try {
      const updatedCard = await Card.findByIdAndUpdate(cardId, card, {
        new: true,
        runValidators: true,
      });
      if (updatedCard !== null) {
        await updatedCard.populate("list_id");
        return updatedCard;
      } else {
        throw new Error("Card not found");
      }
    } catch (error) {
      throw new Error("Error updating card: ", error);
    }
  }

  // DELETE CARD
  static async delete({ cardId }) {
    try {
      const deletedCard = await Card.findByIdAndDelete(cardId);
      if (deletedCard !== null) {
        return { message: "Card deleted sucessfull" };
      } else {
        throw new Error("Card not found");
      }
    } catch (error) {
      throw new Error("Error deleting card: ", error);
    }
  }

  // FIND CARD BY ID
  static async getById({ cardId }) {
    try {
      const card = await Card.findById(cardId)
        .populate("list_id")
        .populate("members.member_id")
        .exec();
      if (card !== null) {
        return card;
      } else {
        throw new Error("Card not found");
      }
    } catch (error) {
      throw new Error("Error getting card: ", error);
    }
  }

  // FIND CARD BY LIST ID
  static async getByListId({ listId }) {
    try {
      const cards = await Card.find({ list_id: listId })
        .populate("list_id")
        .populate("members.member_id")
        .exec();
      if (cards !== null) {
        return cards;
      } else {
        throw new Error("Cards not found");
      }
    } catch (error) {
      throw new Error("Error getting cards: ", error);
    }
  }
}

export default CardModel;
