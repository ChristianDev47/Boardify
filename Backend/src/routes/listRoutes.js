import { Router } from "express";
import ListController from "../controllers/list.js";

const ListRouter = ({ listModel }) => {
  const listRoutes = Router();
  const listController = new ListController({ listModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/lists:
   *     get:
   *       summary: Get all lists
   *       tags: [Lists]
   *       description: Retrieve a list of all available lists.
   *       responses:
   *         '200':
   *           description: A list of lists
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/List'
   *         '404':
   *            description: Error getting lists
   *     post:
   *       summary: Create a list
   *       tags: [Lists]
   *       description: Create a new list.
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
   *           description: List created successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/List'
   *         '400':
   *           description: Error creating list
   *   '/api/lists/{id}':
   *     get:
   *       summary: Get a list by ID
   *       tags: [Lists]
   *       description: Retrieve a specific list by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the list to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: List found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/List'
   *         '404':
   *           description: List not found
   *     patch:
   *       summary: Update a list
   *       tags: [Lists]
   *       description: Update an existing list's information.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the list to update
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
   *           description: List updated successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/List'
   *         '404':
   *           description: Error updating list
   *     delete:
   *       summary: Delete a list
   *       tags: [Lists]
   *       description: Delete a list by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the list to delete
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: List deleted successfully
   *         '404':
   *           description: Error deleting list
   * components:
   *   schemas:
   *     List:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           example: 1
   *         name:
   *           type: string
   *         position:
   *           type: integer
   *           example: 1
   *         board_id:
   *           type: integer
   *           example: 1
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   */

  // RUTAS
  listRoutes.get("/", listController.getAll);
  listRoutes.post("/", listController.create);
  listRoutes.patch("/:id", listController.update);
  listRoutes.delete("/:id", listController.delete);
  listRoutes.get("/:id", listController.getById);
  listRoutes.get("/board/:id", listController.getByBoardId);

  return listRoutes;
};
export default ListRouter;
