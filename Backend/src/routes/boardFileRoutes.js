import { Router } from "express";
import BoardFileController from "../controllers/boardFile.js";
import { uploadBackgroundImage } from "../services/backgroundImage.js";

const BoardFileRouter = ({ boardFileModel }) => {
  const boardFileRoutes = Router();
  const boardFileController = new BoardFileController({ boardFileModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/boardFiles:
   *     get:
   *       summary: Get all boardFiles
   *       tags: [BoardFiles]
   *       description: Retrieve a list of all available boardFiles.
   *       responses:
   *         '200':
   *           description: A list of boardFiles
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/CheckItem'
   *         '404':
   *            description: Error getting boardFiles
   *     post:
   *       summary: Create a boardFile
   *       tags: [BoardFiles]
   *       description: Create a new boardFile.
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
   *                  board_id:
   *                    type: string
   *       responses:
   *         '201':
   *           description: CheckItem created successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/CheckItem'
   *         '400':
   *           description: Error creating boardFile
   *   '/api/boardFiles/{id}':
   *     get:
   *       summary: Get a boardFile by ID
   *       tags: [BoardFiles]
   *       description: Retrieve a specific boardFile by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the boardFile to retrieve
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
   *       summary: Update a boardFile
   *       tags: [BoardFiles]
   *       description: Update an existing boardFile's information.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the boardFile to update
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
   *                  board_id:
   *                    type: string
   *       responses:
   *         '200':
   *           description: CheckItem updated successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/CheckItem'
   *         '404':
   *           description: Error updating boardFile
   *     delete:
   *       summary: Delete a boardFile
   *       tags: [BoardFiles]
   *       description: Delete a boardFile by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the boardFile to delete
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: CheckItem deleted successfully
   *         '404':
   *           description: Error deleting boardFile
   *   '/api/boardFiles/board/{id}':
   *     get:
   *       summary: Get a boardFile by ID
   *       tags: [BoardFiles]
   *       description: Retrieve a specific boardFile by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the boardFile to retrieve
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
   *         board_id:
   *           type: string
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   */

  // RUTAS
  boardFileRoutes.get("/", boardFileController.getAll);
  boardFileRoutes.post(
    "/",
    uploadBackgroundImage.single("location"),
    boardFileController.create
  );
  boardFileRoutes.patch("/:id", boardFileController.update);
  boardFileRoutes.delete("/:id", boardFileController.delete);
  boardFileRoutes.get("/:id", boardFileController.getById);
  boardFileRoutes.get("/board/:id", boardFileController.getByBoardId);

  return boardFileRoutes;
};
export default BoardFileRouter;
