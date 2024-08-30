import {
  validateCardLabel,
  validatePartialCardLabel,
} from "../schemas/validations/cardLabel.js";

class CardLabelController {
  constructor({ cardLabelModel }) {
    this.cardLabelModel = cardLabelModel;
  }

  getAll = async (req, res) => {
    try {
      const cardLabels = await this.cardLabelModel.getAll();
      res.status(200).json(cardLabels);
    } catch (error) {
      console.error("Error getting cardLabels: ", error);
      res.status(404).json({ error: "Error getting cardLabels" });
    }
  };

  create = async (req, res) => {
    try {
      const result = validateCardLabel(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newCardLabel = await this.cardLabelModel.create({
        cardLabel: result.data,
      });
      res.status(201).json(newCardLabel);
    } catch (error) {
      console.error("Error creating cardLabel: ", error);
      res.status(404).json({ error: "Error creating cardLabel" });
    }
  };

  update = async (req, res) => {
    try {
      const cardLabelId = req.params.id;
      const result = validatePartialCardLabel(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const updatedCardLabel = await this.cardLabelModel.update({
        cardLabelId,
        cardLabel: result.data,
      });
      res.status(200).json(updatedCardLabel);
    } catch (error) {
      console.error("Error updating cardLabel: ", error);
      res.status(400).json({ error: "Error updating cardLabel" });
    }
  };

  delete = async (req, res) => {
    try {
      const cardLabelId = req.params.id;
      const cardLabel = await this.cardLabelModel.delete({ cardLabelId });
      res.status(200).json(cardLabel);
    } catch (error) {
      console.error("Error deleting cardLabel: ", error);
      res.status(404).json({ error: "Error deleting cardLabel" });
    }
  };

  getById = async (req, res) => {
    try {
      const cardLabelId = req.params.id;
      const cardLabels = await this.cardLabelModel.getById({ cardLabelId });
      res.status(200).json(cardLabels);
    } catch (error) {
      console.error("Error getting cardLabel: ", error);
      res.status(404).json({ error: "Error getting cardLabel" });
    }
  };

  getByCardId = async (req, res) => {
    try {
      const cardId = req.params.id;
      const cardLabels = await this.cardLabelModel.getByCardId({ cardId });
      res.status(200).json(cardLabels);
    } catch (error) {
      console.error("Error getting cardLabels: ", error);
      res.status(404).json({ error: "Error getting cardLabels" });
    }
  };
}

export default CardLabelController;
