import { Router } from "express";
import BoardActivityController from "../controllers/boardActivity.js";

const BoardActivityRouter = ({ boardActivityModel }) => {
  const boardActivityRoutes = Router();
  const boardActivityController = new BoardActivityController({
    boardActivityModel,
  });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/boardActivities:
   *     get:
   *       summary: Get all boardActivities
   *       tags: [BoardActivities]
   *       description: Retrieve a list of all available boardActivities.
   *       responses:
   *         '200':
   *           description: A list of boardActivities
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/BoardActivities'
   *         '404':
   *            description: Error getting boardActivities
   *     post:
   *       summary: Create a boardctivitie
   *       tags: [BoardActivities]
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
   *                  board_id:
   *                    type: string
   *       responses:
   *         '201':
   *           description: BoardActivities created successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/BoardActivities'
   *         '400':
   *           description: Error creating boardctivitie
   *   '/api/boardActivities/{id}':
   *     get:
   *       summary: Get a boardctivitie by ID
   *       tags: [BoardActivities]
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
   *           description: BoardActivities found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/BoardActivities'
   *         '404':
   *           description: BoardActivities not found
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
  boardActivityRoutes.get("/", boardActivityController.getAll);
  boardActivityRoutes.get("/:id", boardActivityController.getByBoardId);
  boardActivityRoutes.post("/", boardActivityController.create);

  return boardActivityRoutes;
};
export default BoardActivityRouter;
