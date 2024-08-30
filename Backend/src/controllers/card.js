import CardActivityModel from "../models/cardActivity.js";
import ListModel from "../models/list.js";
import { validatePartialCard } from "../schemas/validations/card.js";
import { deleteOldCardBackgroundImage } from "../services/cardBackgroundImage.js";
import { decompress } from "../services/decodeUser.js";

class CardController {
  constructor({ cardModel }) {
    this.cardModel = cardModel;
  }

  getAll = async (req, res) => {
    try {
      const cards = await this.cardModel.getAll();
      res.status(200).json(cards);
    } catch (error) {
      console.error("Error getting cards: ", error);
      res.status(404).json({ error: "Error getting cards" });
    }
  };

  create = async (req, res) => {
    try {
      const data = req.body;
      // Upload Image
      let myNewCard;
      if (req.file) {
        const imagePath = req.file.path;
        myNewCard = {
          ...data,
          background: imagePath,
        };
      } else {
        myNewCard = req.body;
      }
      const result = validatePartialCard(myNewCard);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newCard = await this.cardModel.create({ card: result.data });

      // Save action create in the history
      const { user } = req.cookies;
      const userData = decompress(user);
      const user_id = userData.id;
      if (user_id) {
        const list = await ListModel.getById({ listId: result.data.list_id });
        const myActivity = {
          user_id,
          activity: `ha añadido ${newCard.name} a ${list.name}`,
          cardActivity: `ha añadido ${newCard.name} a esta tarjeta`,
          card_id: newCard._id,
        };
        await CardActivityModel.create({ cardActivity: myActivity });
      }
      res.status(201).json(newCard);
    } catch (error) {
      console.error("Error creating card: ", error);
      res.status(404).json({ error: "Error creating card" });
    }
  };

  update = async (req, res) => {
    try {
      const cardId = req.params.id;
      const result = validatePartialCard(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      let data = result.data;
      // Image Verification updated
      if (req.file) {
        // Getting old image to delete
        const card = await this.cardModel.getById({ cardId });
        deleteOldCardBackgroundImage(card);
        // Uploading the data of the new image
        // Upload Image
        const imagePath = req.file.path;
        data = {
          ...result.data,
          background: imagePath,
        };
      }

      const card = await this.cardModel.getById({ cardId });
      const updatedCard = await this.cardModel.update({ cardId, card: data });

      // Save action move to other list in the history
      const { user } = req.cookies;
      const userData = decompress(user);
      const user_id = userData.id;
      if (user_id && result.data.list_id) {
        const list = await ListModel.getById({ listId: result.data.list_id });
        const myActivity = {
          user_id,
          activity: `ha movido ${updatedCard.name} de ${card.list_id.name} a ${list.name}`,
          cardActivity: `ha movido esta tarjeta de ${card.list_id.name} a ${list.name}`,
          card_id: cardId,
        };
        await CardActivityModel.create({ cardActivity: myActivity });
      } else if (user_id && result.data.due_date) {
        const myActivity = {
          user_id,
          activity: `ha agregado una fecha de vencimiento a ${updatedCard.name}`,
          cardActivity: `ha agregado una fecha de vencimiento a esta tarjeta`,
          card_id: cardId,
        };
        await CardActivityModel.create({ cardActivity: myActivity });
      } else if (
        user_id &&
        result.data.is_completed !== null &&
        result.data.members === null
      ) {
        const myActivity = {
          user_id,
          activity: `${
            result.data.is_completed === true
              ? `ha marcado la fecha de vencimiento de ${updatedCard.name} como cumplida`
              : `ha marcado la fecha de vencimiento de ${updatedCard.name} como no cumplida`
          }`,
          cardActivity: `${
            result.data.is_completed === true
              ? `ha marcado la fecha de vencimiento de esta tarjeta como cumplida`
              : `ha marcado la fecha de vencimiento de esta tarjeta como no cumplida`
          }`,
          card_id: cardId,
        };
        await CardActivityModel.create({ cardActivity: myActivity });
      }
      res.status(200).json(updatedCard);
    } catch (error) {
      console.error("Error updating card: ", error);
      res.status(400).json({ error: "Error updating card" });
    }
  };

  delete = async (req, res) => {
    try {
      const cardId = req.params.id;
      // Getting old image to delete
      const card = await this.cardModel.getById({ cardId });
      if (card.background) {
        deleteOldCardBackgroundImage(card);
      }
      // Save activity
      const { user } = req.cookies;
      const userData = decompress(user);
      const user_id = userData.id;
      if (user_id) {
        const card = await this.cardModel.getById({ cardId });
        const list = await ListModel.getById({ listId: card.list_id._id });
        const myActivity = {
          user_id,
          activity: `ha eliinado la tarjeta #${card.position} (${card.name}) de ${list.name}`,
          cardActivity: `ha eliminado esta tarjeta de ${list.name}`,
          card_id: cardId,
        };
        await CardActivityModel.create({ cardActivity: myActivity });
      }
      const deletedcard = await this.cardModel.delete({ cardId });
      res.status(200).json(deletedcard);
    } catch (error) {
      console.error("Error deleting card: ", error);
      res.status(404).json({ error: "Error deleting card" });
    }
  };

  getById = async (req, res) => {
    try {
      const cardId = req.params.id;
      const cards = await this.cardModel.getById({ cardId });
      res.status(200).json(cards);
    } catch (error) {
      console.error("Error getting card: ", error);
      res.status(404).json({ error: "Error getting card" });
    }
  };

  getByListId = async (req, res) => {
    try {
      const listId = req.params.id;
      const cards = await this.cardModel.getByListId({ listId });
      res.status(200).json(cards);
    } catch (error) {
      console.error("Error getting cards: ", error);
      res.status(404).json({ error: "Error getting cards" });
    }
  };
}

export default CardController;
