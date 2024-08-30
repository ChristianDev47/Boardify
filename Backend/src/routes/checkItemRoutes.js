import { Router } from "express";
import CheckItemController from "../controllers/checkItem.js";

const CheckItemRouter = ({ checkItemModel }) => {
  const checkItemRoutes = Router();
  const checkItemController = new CheckItemController({ checkItemModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/checkItems:
   *     get:
   *       summary: Get all checkItems
   *       tags: [CheckItems]
   *       description: Retrieve a list of all available checkItems.
   *       responses:
   *         '200':
   *           description: A list of checkItems
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/CheckItem'
   *         '404':
   *            description: Error getting checkItems
   *     post:
   *       summary: Create a checkItem
   *       tags: [CheckItems]
   *       description: Create a new checkItem.
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  title:
   *                    type: string
   *                  is_checked:
   *                    type: string
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
   *           description: Error creating checkItem
   *   '/api/checkItems/{id}':
   *     get:
   *       summary: Get a checkItem by ID
   *       tags: [CheckItems]
   *       description: Retrieve a specific checkItem by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the checkItem to retrieve
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
   *       summary: Update a checkItem
   *       tags: [CheckItems]
   *       description: Update an existing checkItem's information.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the checkItem to update
   *           schema:
   *             type: string
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  title:
   *                    type: string
   *                  is_checked:
   *                    type: string
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
   *           description: Error updating checkItem
   *     delete:
   *       summary: Delete a checkItem
   *       tags: [CheckItems]
   *       description: Delete a checkItem by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the checkItem to delete
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: CheckItem deleted successfully
   *         '404':
   *           description: Error deleting checkItem
   *   '/api/checkItems/list/{id}':
   *     get:
   *       summary: Get a checkItem by ID
   *       tags: [CheckItems]
   *       description: Retrieve a specific checkItem by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the checkItem to retrieve
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
   *         title:
   *           type: string
   *         is_checked:
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
  checkItemRoutes.get("/", checkItemController.getAll);
  checkItemRoutes.post("/", checkItemController.create);
  checkItemRoutes.patch("/:id", checkItemController.update);
  checkItemRoutes.delete("/:id", checkItemController.delete);
  checkItemRoutes.get("/:id", checkItemController.getById);
  checkItemRoutes.get("/card/:id", checkItemController.getByCardId);

  return checkItemRoutes;
};
export default CheckItemRouter;
