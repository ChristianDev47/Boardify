import { ListActivity } from "./database/schemas/schemasDB.js";

class ListActivityModel {
  // GET ALL
  static async getAll() {
    try {
      const listActivities = await ListActivity.find()
        .populate("user_id")
        .exec();
      return listActivities;
    } catch (error) {
      throw new Error("Error getting listActivities: ", error);
    }
  }

  // CREATE LIST ACTIVITY
  static async create({ listActivity }) {
    try {
      const newListActivity = await ListActivity.create(listActivity);
      await newListActivity.populate("list_id", "user_id");
      return newListActivity;
    } catch (error) {
      throw new Error("Error creating listActivity: ", error);
    }
  }

  // GET BY LIST ID
  static async getByListId({ listId }) {
    try {
      const listActivities = await ListActivity.find({ list_id: listId })
        .populate("user_id")
        .exec();
      return listActivities;
    } catch (error) {
      throw new Error("Error getting listActivities: ", error);
    }
  }
}

export default ListActivityModel;
