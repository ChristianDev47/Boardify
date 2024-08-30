import { Router } from "express";
import CardController from "../controllers/card.js";
import { uploadCardBackgroundImage } from "../services/cardBackgroundImage.js";

const CardRouter = ({ cardModel }) => {
  const cardRoutes = Router();
  const cardController = new CardController({ cardModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/cards:
   *     get:
   *       summary: Get all cards
   *       tags: [Cards]
   *       description: Retrieve a list of all available cards.
   *       responses:
   *         '200':
   *           description: A list of cards
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/Card'
   *         '404':
   *            description: Error getting cards
   *     post:
   *       summary: Create a card
   *       tags: [Cards]
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
   *                  surname:
   *                    type: string
   *                  email:
   *                    type: string
   *                  password:
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
   *   '/api/cards/{id}':
   *     get:
   *       summary: Get a card by ID
   *       tags: [Cards]
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
   *       tags: [Cards]
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
   *                  surname:
   *                    type: string
   *                  email:
   *                    type: string
   *                  password:
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
   *       tags: [Cards]
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
   *   '/api/cards/list/{id}':
   *     get:
   *       summary: Get a card by ID
   *       tags: [Cards]
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
   *         description:
   *           type: string
   *         is_active:
   *           type: boolean
   *         is_completed:
   *           type: boolean
   *         due_date:
   *           type: date
   *         initial_date:
   *           type: date
   *         background:
   *           type: string
   *         position:
   *           type: integer
   *         list_id:
   *           type: string
   *         members:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               member_id:
   *                 type: string
   *               role:
   *                 type: string
   *                 enum:
   *                   - administrador
   *                   - colaborador
   *                   - invitado
   *               permissions:
   *                 type: array
   *                 items:
   *                    type: string
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   */

  // RUTAS
  cardRoutes.get("/", cardController.getAll);
  cardRoutes.post(
    "/",
    uploadCardBackgroundImage.single("background"),
    cardController.create
  );
  cardRoutes.patch(
    "/:id",
    uploadCardBackgroundImage.single("background"),
    cardController.update
  );
  cardRoutes.delete("/:id", cardController.delete);
  cardRoutes.get("/:id", cardController.getById);
  cardRoutes.get("/list/:id", cardController.getByListId);

  return cardRoutes;
};
export default CardRouter;
