import { List } from "./database/schemas/schemasDB.js";

class ListModel {
  // GET ALL
  static async getAll() {
    try {
      const lists = await List.find().populate("board_id").exec();
      return lists;
    } catch (error) {
      throw new Error("Error getting lists: ", error);
    }
  }

  // CREATE LIST
  static async create({ list }) {
    try {
      const newList = await List.create(list);
      await newList.populate("board_id");
      return newList;
    } catch (error) {
      throw new Error("Error creating list: ", error);
    }
  }

  // UPDATE LIST
  static async update({ listId, list }) {
    try {
      const updatedList = await List.findByIdAndUpdate(listId, list, {
        new: true,
        runValidators: true,
      });
      if (updatedList !== null) {
        await updatedList.populate("board_id");
        return updatedList;
      } else {
        throw new Error("List not found");
      }
    } catch (error) {
      throw new Error("Error updating list: ", error);
    }
  }

  // DELETE LIST
  static async delete({ listId }) {
    try {
      const deletedList = await List.findByIdAndDelete(listId);
      if (deletedList !== null) {
        return { message: "List deleted sucessfull" };
      } else {
        throw new Error("List not found");
      }
    } catch (error) {
      throw new Error("Error deleting list: ", error);
    }
  }

  // FIND LIST BY ID
  static async getById({ listId }) {
    try {
      const list = await List.findById(listId).populate("board_id").exec();
      if (list !== null) {
        return list;
      } else {
        throw new Error("List not found");
      }
    } catch (error) {
      throw new Error("Error getting list: ", error);
    }
  }

  // FIND LIST BY BOARDID
  static async getByBoardId({ boardId }) {
    try {
      const lists = await List.find({ board_id: boardId })
        .populate("board_id")
        .exec();
      if (lists !== null) {
        return lists;
      } else {
        throw new Error("Lists not found");
      }
    } catch (error) {
      throw new Error("Error getting lists: ", error);
    }
  }
}

export default ListModel;
