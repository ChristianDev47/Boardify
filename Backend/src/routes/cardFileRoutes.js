import { Router } from "express";
import CardFileController from "../controllers/cardFile.js";
import { upload } from "../services/files.js";

const CardFileRouter = ({ cardFileModel }) => {
  const cardFileRoutes = Router();
  const cardFileController = new CardFileController({ cardFileModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/cardFiles:
   *     get:
   *       summary: Get all cardFiles
   *       tags: [CardFiles]
   *       description: Retrieve a list of all available cardFiles.
   *       responses:
   *         '200':
   *           description: A list of cardFiles
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/CheckItem'
   *         '404':
   *            description: Error getting cardFiles
   *     post:
   *       summary: Create a cardFile
   *       tags: [CardFiles]
   *       description: Create a new cardFile.
   *       requestBody:
   *         required: true
   *         content:
   *           multipart/form-data:
   *             schema:
   *               type: object
   *               properties:
   *                  filename:
   *                    type: string
   *                  location:
   *                    type: file
   *                  card_id:
   *                    type: string
   *       responses:
   *         '201':
   *           description: CheckItem created successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/CheckItem'
   *         '400':
   *           description: Error creating cardFile
   *   '/api/cardFiles/{id}':
   *     get:
   *       summary: Get a cardFile by ID
   *       tags: [CardFiles]
   *       description: Retrieve a specific cardFile by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the cardFile to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: CheckItem found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/CheckItem'
   *         '404':
   *           description: CheckItem not found
   *     patch:
   *       summary: Update a cardFile
   *       tags: [CardFiles]
   *       description: Update an existing cardFile's information.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the cardFile to update
   *           schema:
   *             type: string
   *       requestBody:
   *         required: true
   *         content:
   *           multipart/form-data:
   *             schema:
   *               type: object
   *               properties:
   *                  filename:
   *                    type: string
   *                  location:
   *                    type: file
   *                  card_id:
   *                    type: string
   *       responses:
   *         '200':
   *           description: CheckItem updated successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/CheckItem'
   *         '404':
   *           description: Error updating cardFile
   *     delete:
   *       summary: Delete a cardFile
   *       tags: [CardFiles]
   *       description: Delete a cardFile by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the cardFile to delete
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: CheckItem deleted successfully
   *         '404':
   *           description: Error deleting cardFile
   *   '/api/cardFiles/card/{id}':
   *     get:
   *       summary: Get a cardFile by ID
   *       tags: [CardFiles]
   *       description: Retrieve a specific cardFile by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the cardFile to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: CheckItem found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/CheckItemList'
   *         '404':
   *           description: CheckItem not found
   * components:
   *   schemas:
   *     CheckItem:
   *       type: object
   *       properties:
   *         _id:
   *           type: string
   *         filename:
   *           type: string
   *         location:
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
  cardFileRoutes.get("/", cardFileController.getAll);
  cardFileRoutes.post(
    "/",
    upload.single("location"),
    cardFileController.create
  );
  cardFileRoutes.patch("/:id", cardFileController.update);
  cardFileRoutes.delete("/:id", cardFileController.delete);
  cardFileRoutes.get("/:id", cardFileController.getById);
  cardFileRoutes.get("/card/:id", cardFileController.getByCardId);

  return cardFileRoutes;
};
export default CardFileRouter;
