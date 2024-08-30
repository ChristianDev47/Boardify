import { CheckItem } from "./database/schemas/schemasDB.js";

class CheckItemModel {
  // GET ALL
  static async getAll() {
    try {
      const checkItems = await CheckItem.find().populate("card_id").exec();
      return checkItems;
    } catch (error) {
      throw new Error("Error getting checkItems: ", error);
    }
  }

  // CREATE CHECKITEM
  static async create({ checkItem }) {
    try {
      const newCheckItem = await CheckItem.create(checkItem);
      await newCheckItem.populate("card_id");
      return newCheckItem;
    } catch (error) {
      throw new Error("Error creating checkItem: ", error);
    }
  }

  // UPDATE CHECKITEM
  static async update({ checkItemId, checkItem }) {
    try {
      const updatedCheckItem = await CheckItem.findByIdAndUpdate(
        checkItemId,
        checkItem,
        { new: true, runValidators: true }
      );
      if (updatedCheckItem !== null) {
        await updatedCheckItem.populate("card_id");
        return updatedCheckItem;
      } else {
        throw new Error("CheckItem not found");
      }
    } catch (error) {
      throw new Error("Error updating checkItem: ", error);
    }
  }

  // DELETE CHECKITEM
  static async delete({ checkItemId }) {
    try {
      const deletedCheckItem = await CheckItem.findByIdAndDelete(checkItemId);
      if (deletedCheckItem !== null) {
        return { message: "CheckItem deleted sucessfull" };
      } else {
        throw new Error("CheckItem not found");
      }
    } catch (error) {
      throw new Error("Error deleting checkItem: ", error);
    }
  }

  // FIND CHECKITEM BY ID
  static async getById({ checkItemId }) {
    try {
      const checkItem = await CheckItem.findById(checkItemId)
        .populate("card_id")
        .exec();
      if (checkItem !== null) {
        return checkItem;
      } else {
        throw new Error("CheckItem not found");
      }
    } catch (error) {
      throw new Error("Error getting checkItem: ", error);
    }
  }

  // FIND CHECKITEM BY CARDID
  static async getByCardId({ cardId }) {
    try {
      const checkItems = await CheckItem.find({ card_id: cardId })
        .populate("card_id")
        .exec();
      if (checkItems !== null) {
        return checkItems;
      } else {
        throw new Error("CheckItems not found");
      }
    } catch (error) {
      throw new Error("Error getting checkItems: ", error);
    }
  }
}

export default CheckItemModel;
