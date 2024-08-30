import ListActivityModel from "../models/listActivity.js";
import {
  validateList,
  validatePartialList,
} from "../schemas/validations/list.js";
import { decompress } from "../services/decodeUser.js";

class ListController {
  constructor({ listModel }) {
    this.listModel = listModel;
  }

  getAll = async (req, res) => {
    try {
      const lists = await this.listModel.getAll();
      res.status(200).json(lists);
    } catch (error) {
      console.error("Error getting lists: ", error);
      res.status(404).json({ error: "Error getting lists" });
    }
  };

  create = async (req, res) => {
    try {
      const result = validateList(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newList = await this.listModel.create({ list: result.data });
      // Save action create in the history
      const { user } = req.cookies;
      const userData = decompress(user);
      const user_id = userData.id;
      if (user_id) {
        const myActivity = {
          user_id,
          activity: `ha añadido la lista "${newList.name}" a este tablero`,
          list_id: newList.id,
        };
        await ListActivityModel.create({ listActivity: myActivity });
      }
      res.status(201).json(newList);
    } catch (error) {
      console.error("Error creating list: ", error);
      res.status(404).json({ error: "Error creating list" });
    }
  };

  update = async (req, res) => {
    try {
      const listId = req.params.id;
      const result = validatePartialList(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const updatedList = await this.listModel.update({
        listId,
        list: result.data,
      });
      res.status(200).json(updatedList);
    } catch (error) {
      console.error("Error updating list: ", error);
      res.status(400).json({ error: "Error updating list" });
    }
  };

  delete = async (req, res) => {
    try {
      const listId = req.params.id;
      const list = await this.listModel.delete({ listId });
      // Save action create in the history
      const { user } = req.cookies;
      const userData = decompress(user);
      const user_id = userData.id;
      if (user_id) {
        const lists = await this.listModel.getById({ listId });

        const myActivity = {
          user_id,
          activity: `ha eliminado la lista "${lists.name}" de este tablero`,
          list_id: newList.id,
        };
        await ListActivityModel.create({ listActivity: myActivity });
      }
      res.status(200).json(list);
    } catch (error) {
      console.error("Error deleting list: ", error);
      res.status(404).json({ error: "Error deleting list" });
    }
  };

  getById = async (req, res) => {
    try {
      const listId = req.params.id;
      const lists = await this.listModel.getById({ listId });
      res.status(200).json(lists);
    } catch (error) {
      console.error("Error getting list: ", error);
      res.status(404).json({ error: "Error getting list" });
    }
  };

  getByBoardId = async (req, res) => {
    try {
      const boardId = req.params.id;
      const lists = await this.listModel.getByBoardId({ boardId });
      res.status(200).json(lists);
    } catch (error) {
      console.error("Error getting lists: ", error);
      res.status(404).json({ error: "Error getting lists" });
    }
  };
}

export default ListController;
