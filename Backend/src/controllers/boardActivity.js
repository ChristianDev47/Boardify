import { validateBoardActivity } from "../schemas/validations/boardActivity.js";

class BoardActivityController {
  constructor({ boardActivityModel }) {
    this.boardActivityModel = boardActivityModel;
  }

  getAll = async (req, res) => {
    try {
      const boardActivities = await this.boardActivityModel.getAll();
      res.status(200).json(boardActivities);
    } catch (error) {
      console.error("Error getting boardActivities: ", error);
      res.status(404).json({ error: "Error getting boardActivities" });
    }
  };

  create = async (req, res) => {
    try {
      const result = validateBoardActivity(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newBoardActivity = await this.boardActivityModel.create({
        boardActivity: result.data,
      });
      res.status(201).json(newBoardActivity);
    } catch (error) {
      console.error("Error creating boardActivity: ", error);
      res.status(404).json({ error: "Error creating boardActivity" });
    }
  };

  getByBoardId = async (req, res) => {
    try {
      const { id } = req.params;
      const boardActivities = await this.boardActivityModel.getByBoardId({
        boardId: id,
      });
      res.status(200).json(boardActivities);
    } catch (error) {
      console.error("Error getting boardActivities: ", error);
      res.status(404).json({ error: "Error getting boardActivities" });
    }
  };
}

export default BoardActivityController;
