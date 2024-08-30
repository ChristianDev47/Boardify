import { Router } from "express";
import BoardController from "../controllers/board.js";

const BoardRouter = ({ boardModel }) => {
  const boardRoutes = Router();
  const boardController = new BoardController({ boardModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/boards:
   *     get:
   *       summary: Get all boards
   *       tags: [Boards]
   *       description: Retrieve a list of all available boards.
   *       responses:
   *         '200':
   *           description: A list of boards
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/Board'
   *         '404':
   *            description: Error getting boards
   *     post:
   *       summary: Create a board
   *       tags: [Boards]
   *       description: Create a new board.
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  title:
   *                    type: string
   *                  state:
   *                    type: boolean
   *                  background:
   *                    type: string
   *                  user_id:
   *                    type: string
   *                  board_permissions:
   *                    type: string
   *                    enum:
   *                      - Administradores
   *                      - Miembros
   *                  members:
   *                    type: array
   *                    items:
   *                      type: object
   *                      properties:
   *                        member_id:
   *                          type: string
   *                        role:
   *                          type: string
   *                          enum:
   *                            - administrador
   *                            - colaborador
   *                            - invitado
   *                        permissions:
   *                          type: array
   *                          items: string
   *                  allow_background:
   *                    type: boolean
   *       responses:
   *         '201':
   *           description: Board created successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Board'
   *         '400':
   *           description: Error creating board
   *   '/api/boards/{id}':
   *     get:
   *       summary: Get a board by ID
   *       tags: [Boards]
   *       description: Retrieve a specific board by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the board to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Board found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Board'
   *         '404':
   *           description: Board not found
   *     patch:
   *       summary: Update a board
   *       tags: [Boards]
   *       description: Update an existing board's information.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the board to update
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
   *                  state:
   *                    type: boolean
   *                  background:
   *                    type: string
   *                  user_id:
   *                    type: string
   *                  board_permissions:
   *                    type: string
   *                    enum:
   *                      - Administradores
   *                      - Miembros
   *                  members:
   *                    type: array
   *                    items:
   *                      type: object
   *                      properties:
   *                        member_id:
   *                          type: string
   *                        role:
   *                          type: string
   *                          enum:
   *                            - administrador
   *                            - colaborador
   *                            - invitado
   *                        permissions:
   *                          type: array
   *                          items: string
   *                  allow_background:
   *                    type: boolean
   *       responses:
   *         '200':
   *           description: Board updated successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Board'
   *         '404':
   *           description: Error updating board
   *     delete:
   *       summary: Delete a board
   *       tags: [Boards]
   *       description: Delete a board by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the board to delete
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Board deleted successfully
   *         '404':
   *           description: Error deleting board
   *   '/api/boards/user/{id}':
   *     get:
   *       summary: Get a board by user ID
   *       tags: [Boards]
   *       description: Retrieve a specific board by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the board to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Board found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/BoardUser'
   *   '/api/boards/member/{id}':
   *     get:
   *       summary: Get a board by member ID
   *       tags: [Boards]
   *       description: Retrieve a specific board by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the board to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Board found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/BoardUser'
   * components:
   *   schemas:
   *     Board:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *         title:
   *           type: string
   *         state:
   *           type: boolean
   *         background:
   *           type: string
   *         user_id:
   *           type: string
   *         board_permissions:
   *           type: string
   *           enum:
   *            - Administradores
   *            - Miembros
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
   *         allow_background:
   *           type: boolean
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   *     BoardUser:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *         title:
   *           type: string
   *         state:
   *           type: boolean
   *         background:
   *           type: string
   *         board_permissions:
   *           type: string
   *           enum:
   *            - Administradores
   *            - Miembros
   *         user_id:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *             surname:
   *               type: string
   *             email:
   *               type: string
   *             password:
   *               type: string
   *             createdAt:
   *               type: string
   *             updatedAt:
   *               type: string
   *               format: date-time
   *             access_token:
   *               type: string
   *             expiration:
   *               type: string
   *               format: date-time
   *             id:
   *               type: string
   *         members:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               member_id:
   *                 type: object
   *                 properties:
   *                   name:
   *                     type: string
   *                   surname:
   *                     type: string
   *                   email:
   *                     type: string
   *                   password:
   *                     type: string
   *                   createdAt:
   *                     type: string
   *                     format: date-time
   *                   updatedAt:
   *                     type: string
   *                     format: date-time
   *                   access_token:
   *                     type: string
   *                   expiration:
   *                     type: string
   *                     format: date-time
   *                   id:
   *                     type: string
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
   *         allow_background:
   *           type: boolean
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   */

  // RUTAS
  boardRoutes.get("/", boardController.getAll);
  boardRoutes.post("/", boardController.create);
  boardRoutes.patch("/:id", boardController.update);
  boardRoutes.delete("/:id", boardController.delete);
  boardRoutes.get("/:id", boardController.getById);
  boardRoutes.get("/user/:id", boardController.getByUserId);
  boardRoutes.get("/member/:id", boardController.getByMemberId);

  return boardRoutes;
};
export default BoardRouter;
