import { Router } from "express";
import CardLabelController from "../controllers/cardLabel.js";

const CardLabelRouter = ({ cardLabelModel }) => {
  const cardLabelRoutes = Router();
  const cardLabelController = new CardLabelController({ cardLabelModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/cardLabels:
   *     get:
   *       summary: Get all cardLabels
   *       tags: [CardLabels]
   *       description: Retrieve a list of all available cardLabels.
   *       responses:
   *         '200':
   *           description: A list of cardLabels
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/Card'
   *         '404':
   *            description: Error getting cardLabels
   *     post:
   *       summary: Create a card
   *       tags: [CardLabels]
   *       description: Create a new card.
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  name:
   *                    type: string
   *                  background:
   *                    type: string
   *                  color:
   *                    type: string
   *                  is_active:
   *                    type: boolean
   *                  card_id:
   *                    type: string
   *       responses:
   *         '201':
   *           description: Card created successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Card'
   *         '400':
   *           description: Error creating card
   *   '/api/cardLabels/{id}':
   *     get:
   *       summary: Get a card by ID
   *       tags: [CardLabels]
   *       description: Retrieve a specific card by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the card to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Card found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Card'
   *         '404':
   *           description: Card not found
   *     patch:
   *       summary: Update a card
   *       tags: [CardLabels]
   *       description: Update an existing card's information.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the card to update
   *           schema:
   *             type: string
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  name:
   *                    type: string
   *                  background:
   *                    type: string
   *                  color:
   *                    type: string
   *                  is_active:
   *                    type: boolean
   *                  card_id:
   *                    type: string
   *       responses:
   *         '200':
   *           description: Card updated successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Card'
   *         '404':
   *           description: Error updating card
   *     delete:
   *       summary: Delete a card
   *       tags: [CardLabels]
   *       description: Delete a card by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the card to delete
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Card deleted successfully
   *         '404':
   *           description: Error deleting card
   *   '/api/cardLabels/card/{id}':
   *     get:
   *       summary: Get a card by ID
   *       tags: [CardLabels]
   *       description: Retrieve a specific card by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the card to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Card found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/CardList'
   *         '404':
   *           description: Card not found
   * components:
   *   schemas:
   *     Card:
   *       type: object
   *       properties:
   *         _id:
   *           type: string
   *         name:
   *           type: string
   *         background:
   *           type: string
   *         color:
   *           type: string
   *         is_active:
   *           type: boolean
   *         card_id:
   *           type: object
   *           properties:
   *             _id:
   *               type: string
   *             name:
   *               type: string
   *             description:
   *               type: string
   *             is_active:
   *               type: boolean
   *             is_completed:
   *               type: boolean
   *             due_date:
   *               type: date
   *             initial_date:
   *               type: date
   *             background:
   *               type: string
   *             position:
   *               type: integer
   *             list_id:
   *               type: string
   *             members:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   member_id:
   *                     type: string
   *                   role:
   *                     type: string
   *                     enum:
   *                       - administrador
   *                       - colaborador
   *                       - invitado
   *                   permissions:
   *                     type: array
   *                     items:
   *                        type: string
   *             createdAt:
   *               type: string
   *               format: date-time
   *             updatedAt:
   *               type: string
   *               format: date-time
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   */

  // RUTAS
  cardLabelRoutes.get("/", cardLabelController.getAll);
  cardLabelRoutes.post("/", cardLabelController.create);
  cardLabelRoutes.patch("/:id", cardLabelController.update);
  cardLabelRoutes.delete("/:id", cardLabelController.delete);
  cardLabelRoutes.get("/:id", cardLabelController.getById);
  cardLabelRoutes.get("/card/:id", cardLabelController.getByCardId);

  return cardLabelRoutes;
};
export default CardLabelRouter;
