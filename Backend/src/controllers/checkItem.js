import CardActivityModel from "../models/cardActivity.js";
import UserModel from "../models/user.js";
import {
  validateCheckItem,
  validatePartialCheckItem,
} from "../schemas/validations/checkItem.js";
import { decompress } from "../services/decodeUser.js";

class CheckItemController {
  constructor({ checkItemModel }) {
    this.checkItemModel = checkItemModel;
  }

  getAll = async (req, res) => {
    try {
      const checkItems = await this.checkItemModel.getAll();
      res.status(200).json(checkItems);
    } catch (error) {
      console.error("Error getting checkItems: ", error);
      res.status(404).json({ error: "Error getting checkItems" });
    }
  };

  create = async (req, res) => {
    try {
      const result = validateCheckItem(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newCheckItem = await this.checkItemModel.create({
        checkItem: result.data,
      });
      // Save action checklist in the history
      const { user } = req.cookies;
      const userData = decompress(user);
      const user_id = userData.id;
      if (user_id) {
        const cardId = newCheckItem.card_id._id.toString();
        const myActivity = {
          user_id,
          activity: `ha agregado la tarea ${newCheckItem.title} en ${newCheckItem.card_id.name}`,
          cardActivity: `ha agregado la tarea ${newCheckItem.title} en esta tarjeta`,
          card_id: cardId,
        };
        await CardActivityModel.create({ cardActivity: myActivity });
      }
      res.status(201).json(newCheckItem);
    } catch (error) {
      console.error("Error creating checkItem: ", error);
      res.status(404).json({ error: "Error creating checkItem" });
    }
  };

  update = async (req, res) => {
    try {
      const checkItemId = req.params.id;
      const result = validatePartialCheckItem(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const updatedCheckItem = await this.checkItemModel.update({
        checkItemId,
        checkItem: result.data,
      });
      // Save action checklist in the history
      const { user } = req.cookies;
      const userData = decompress(user);
      const user_id = userData.id;
      if (user_id && updatedCheckItem.is_checked !== null) {
        const cardId = updatedCheckItem.card_id._id.toString();
        const checkItems = await this.checkItemModel.getById({ checkItemId });
        const myActivity = {
          user_id,
          activity:
            updatedCheckItem.is_checked === true
              ? `ha completado ${checkItems.title} en  ${updatedCheckItem.card_id.name} `
              : `ha marcadado ${checkItems.title} como incompleto en  ${updatedCheckItem.card_id.name}`,
          cardActivity:
            updatedCheckItem.is_checked === true
              ? `ha completado ${checkItems.title} en esta tarjeta `
              : `ha marcadado ${checkItems.title} como incompleto en esta tarjeta`,
          card_id: cardId,
        };
        const newCard = await CardActivityModel.create({
          cardActivity: myActivity,
        });
      }
      res.status(200).json(updatedCheckItem);
    } catch (error) {
      console.error("Error updating checkItem: ", error);
      res.status(400).json({ error: "Error updating checkItem" });
    }
  };

  delete = async (req, res) => {
    try {
      const checkItemId = req.params.id;
      const myCheckItem = await this.checkItemModel.getById({ checkItemId });
      const checkItem = await this.checkItemModel.delete({ checkItemId });
      // Save action checklist in the history
      const { user } = req.cookies;
      const userData = decompress(user);
      const user_id = userData.id;
      if (user_id) {
        const cardId = myCheckItem.card_id._id.toString();
        const myActivity = {
          user_id,
          activity: `ha quitado a ${myCheckItem.title} de ${myCheckItem.card_id.name}`,
          cardActivity: `ha quitado a ${myCheckItem.title} de esta tarjeta`,
          card_id: cardId,
        };
        await CardActivityModel.create({ cardActivity: myActivity });
      }
      res.status(200).json(checkItem);
    } catch (error) {
      console.error("Error deleting checkItem: ", error);
      res.status(404).json({ error: "Error deleting checkItem" });
    }
  };

  getById = async (req, res) => {
    try {
      const checkItemId = req.params.id;
      const checkItems = await this.checkItemModel.getById({ checkItemId });
      res.status(200).json(checkItems);
    } catch (error) {
      console.error("Error getting checkItem: ", error);
      res.status(404).json({ error: "Error getting checkItem" });
    }
  };

  getByCardId = async (req, res) => {
    try {
      const cardId = req.params.id;
      const checkItems = await this.checkItemModel.getByCardId({ cardId });
      res.status(200).json(checkItems);
    } catch (error) {
      console.error("Error getting checkItems: ", error);
      res.status(404).json({ error: "Error getting checkItems" });
    }
  };
}

export default CheckItemController;
