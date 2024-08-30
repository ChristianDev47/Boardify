import { validateListActivity } from "../schemas/validations/listActivity.js";

class ListActivityController {
  constructor({ listActivityModel }) {
    this.listActivityModel = listActivityModel;
  }

  getAll = async (req, res) => {
    try {
      const listActivities = await this.listActivityModel.getAll();
      res.status(200).json(listActivities);
    } catch (error) {
      console.error("Error getting listActivities: ", error);
      res.status(404).json({ error: "Error getting listActivities" });
    }
  };

  create = async (req, res) => {
    try {
      const result = validateListActivity(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newListActivity = await this.listActivityModel.create({
        listActivity: result.data,
      });
      res.status(201).json(newListActivity);
    } catch (error) {
      console.error("Error creating listActivity: ", error);
      res.status(404).json({ error: "Error creating listActivity" });
    }
  };

  getByListId = async (req, res) => {
    try {
      const { id } = req.params;
      const listActivities = await this.listActivityModel.getByListId({
        listId: id,
      });
      res.status(200).json(listActivities);
    } catch (error) {
      console.error("Error getting listActivities: ", error);
      res.status(404).json({ error: "Error getting listActivities" });
    }
  };
}

export default ListActivityController;
