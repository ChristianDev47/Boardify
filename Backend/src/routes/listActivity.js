import { Router } from "express";
import ListActivityController from "../controllers/listActivity.js";

const ListActivityRouter = ({ listActivityModel }) => {
  const listActivityRoutes = Router();
  const listActivityController = new ListActivityController({
    listActivityModel,
  });
  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/listActivities:
   *     get:
   *       summary: Get all listActivities
   *       tags: [ListActivities]
   *       description: Retrieve a list of all available listActivities.
   *       responses:
   *         '200':
   *           description: A list of listActivities
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/ListActivities'
   *         '404':
   *            description: Error getting listActivities
   *     post:
   *       summary: Create a boardctivitie
   *       tags: [ListActivities]
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
   *                  list_id:
   *                    type: string
   *       responses:
   *         '201':
   *           description: ListActivities created successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/ListActivities'
   *         '400':
   *           description: Error creating boardctivitie
   *   '/api/listActivities/{id}':
   *     get:
   *       summary: Get a boardctivitie by ID
   *       tags: [ListActivities]
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
   *           description: ListActivities found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/ListActivities'
   *         '404':
   *           description: ListActivities not found
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
   *         list_id:
   *           type: string
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   */

  // RUTAS
  listActivityRoutes.get("/", listActivityController.getAll);
  listActivityRoutes.get("/:id", listActivityController.getByListId);
  listActivityRoutes.post("/", listActivityController.create);

  return listActivityRoutes;
};
export default ListActivityRouter;
