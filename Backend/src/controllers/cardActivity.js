import { validateCardActivity } from "../schemas/validations/cardActivity.js";

class CardActivityController {
  constructor({ cardActivityModel }) {
    this.cardActivityModel = cardActivityModel;
  }

  getAll = async (req, res) => {
    try {
      const cardActivities = await this.cardActivityModel.getAll();
      res.status(200).json(cardActivities);
    } catch (error) {
      console.error("Error getting cardActivities: ", error);
      res.status(404).json({ error: "Error getting cardActivities" });
    }
  };

  create = async (req, res) => {
    try {
      const result = validateCardActivity(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newCardActivity = await this.cardActivityModel.create({
        cardActivity: result.data,
      });
      res.status(201).json(newCardActivity);
    } catch (error) {
      console.error("Error creating cardActivity: ", error);
      res.status(404).json({ error: "Error creating cardActivity" });
    }
  };

  getByCardId = async (req, res) => {
    try {
      const { id } = req.params;
      const cardActivities = await this.cardActivityModel.getByCardId({
        cardId: id,
      });
      res.status(200).json(cardActivities);
    } catch (error) {
      console.error("Error getting cardActivities: ", error);
      res.status(404).json({ error: "Error getting cardActivities" });
    }
  };
}

export default CardActivityController;
