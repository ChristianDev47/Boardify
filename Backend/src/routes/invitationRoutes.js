import { Router } from "express";
import BoardInvitationController from "../controllers/invitation.js";

const BoardInvitationRouter = ({ boardInvitationModel }) => {
  const boardInvitationRoutes = Router();
  const boardInvitationController = new BoardInvitationController({
    boardInvitationModel,
  });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/invitations:
   *     get:
   *       summary: Get all invitations
   *       tags: [Invitations]
   *       description: Retrieve a list of all available invitations.
   *       responses:
   *         '200':
   *           description: A list of invitations
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/CheckItem'
   *         '404':
   *            description: Error getting invitations
   *     post:
   *       summary: Create a invitation
   *       tags: [Invitations]
   *       description: Create a new invitation.
   *       requestBody:
   *         required: true
   *         content:
   *           multipart/form-data:
   *             schema:
   *               type: object
   *               properties:
   *                  user_id:
   *                    type: string
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
   *           description: Error creating invitation
   *   '/api/invitations/{id}':
   *     get:
   *       summary: Get a invitation by ID
   *       tags: [Invitations]
   *       description: Retrieve a specific invitation by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the invitation to retrieve
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
   *   '/api/invitations/link/{token}':
   *     get:
   *       summary: Get a invitation by ID
   *       tags: [Invitations]
   *       description: Retrieve a specific invitation by its ID.
   *       parameters:
   *         - name: token
   *           in: path
   *           required: true
   *           description: The ID of the invitation to retrieve
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
   *         user_id:
   *           type: string
   *         board_id:
   *           type: string
   *         expiration:
   *           type: string
   *           format: date-time
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   */

  // RUTAS
  boardInvitationRoutes.get("/", boardInvitationController.getAll);
  boardInvitationRoutes.post("/", boardInvitationController.create);
  boardInvitationRoutes.get(
    "/link/:token",
    boardInvitationController.getByToken
  );
  boardInvitationRoutes.get("/:id", boardInvitationController.getById);

  return boardInvitationRoutes;
};
export default BoardInvitationRouter;
