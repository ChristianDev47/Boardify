import { Router } from "express";
import UserFileController from "../controllers/userFile.js";
import { uploadProfileImage } from "../services/userImage.js";

const UserFileRouter = ({ userFileModel }) => {
  const userFileRoutes = Router();
  const userFileController = new UserFileController({ userFileModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/userFiles:
   *     get:
   *       summary: Get all userFiles
   *       tags: [UserFiles]
   *       description: Retrieve a list of all available userFiles.
   *       responses:
   *         '200':
   *           description: A list of userFiles
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/CheckItem'
   *         '404':
   *            description: Error getting userFiles
   *     post:
   *       summary: Create a boardFile
   *       tags: [UserFiles]
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
   *                  user_id:
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
   *   '/api/userFiles/{id}':
   *     get:
   *       summary: Get a boardFile by ID
   *       tags: [UserFiles]
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
   *       tags: [UserFiles]
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
   *                  user_id:
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
   *       tags: [UserFiles]
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
   *   '/api/userFiles/user/{id}':
   *     get:
   *       summary: Get a boardFile by ID
   *       tags: [UserFiles]
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
   *         user_id:
   *           type: string
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   */

  // RUTAS
  userFileRoutes.get("/", userFileController.getAll);
  userFileRoutes.post(
    "/",
    uploadProfileImage.single("location"),
    userFileController.create
  );
  userFileRoutes.patch("/:id", userFileController.update);
  userFileRoutes.delete("/:id", userFileController.delete);
  userFileRoutes.get("/:id", userFileController.getById);
  userFileRoutes.get("/user/:id", userFileController.getByUserId);

  return userFileRoutes;
};
export default UserFileRouter;
