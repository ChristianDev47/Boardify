import { Router } from "express";
import CardActivityController from "../controllers/cardActivity.js";

const CardActivityRouter = ({ cardActivityModel }) => {
  const cardActivityRoutes = Router();
  const cardActivityController = new CardActivityController({
    cardActivityModel,
  });
  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/cardActivities:
   *     get:
   *       summary: Get all cardActivities
   *       tags: [CardActivities]
   *       description: Retrieve a list of all available cardActivities.
   *       responses:
   *         '200':
   *           description: A list of cardActivities
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/CardActivities'
   *         '404':
   *            description: Error getting cardActivities
   *     post:
   *       summary: Create a boardctivitie
   *       tags: [CardActivities]
   *       description: Create a new boardctivitie.
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  user:
   *                    type: string
   *                  activity:
   *                    type: string
   *                  cardActivity:
   *                    type: string
   *                  card_id:
   *                    type: string
   *       responses:
   *         '201':
   *           description: CardActivities created successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/CardActivities'
   *         '400':
   *           description: Error creating boardctivitie
   *   '/api/cardActivities/{id}':
   *     get:
   *       summary: Get a boardctivitie by ID
   *       tags: [CardActivities]
   *       description: Retrieve a specific boardctivitie by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the boardctivitie to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: CardActivities found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/CardActivities'
   *         '404':
   *           description: CardActivities not found
   * components:
   *   schemas:
   *     BoardActivitie:
   *       type: object
   *       properties:
   *         _id:
   *           type: string
   *         user:
   *           type: string
   *         activity:
   *           type: boolean
   *         cardActivity:
   *           type: boolean
   *         card_id:
   *           type: string
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   */

  // RUTAS
  cardActivityRoutes.get("/", cardActivityController.getAll);
  cardActivityRoutes.get("/:id", cardActivityController.getByCardId);
  cardActivityRoutes.post("/", cardActivityController.create);

  return cardActivityRoutes;
};
export default CardActivityRouter;
