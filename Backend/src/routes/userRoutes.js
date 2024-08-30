import { Router } from "express";
import UserController from "../controllers/user.js";
import { uploadProfileImage } from "../services/userImage.js";

const UserRouter = ({ userModel }) => {
  const userRoutes = Router();
  const userController = new UserController({ userModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/users:
   *     get:
   *       summary: Get all users
   *       tags: [Users]
   *       description: Retrieve a list of all available users.
   *       responses:
   *         '200':
   *           description: A list of users
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/User'
   *         '404':
   *            description: Error getting users
   *     post:
   *       summary: Create a user
   *       tags: [Users]
   *       description: Create a new user.
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
   *           description: User created successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/User'
   *         '400':
   *           description: Error creating user
   *   '/api/users/{id}':
   *     get:
   *       summary: Get a user by ID
   *       tags: [Users]
   *       description: Retrieve a specific user by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the user to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: User found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/User'
   *         '404':
   *           description: User not found
   *     patch:
   *       summary: Update a user
   *       tags: [Users]
   *       description: Update an existing user's information.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the user to update
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
   *           description: User updated successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/User'
   *         '404':
   *           description: Error updating user
   *     delete:
   *       summary: Delete a user
   *       tags: [Users]
   *       description: Delete a user by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the user to delete
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: User deleted successfully
   *         '404':
   *           description: Error deleting user
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *         name:
   *           type: string
   *         surname:
   *           type: string
   *         email:
   *           type: string
   *         password:
   *           type: string
   *         profile:
   *           type: string
   *         access_token:
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
  userRoutes.get("/", userController.getAll);
  userRoutes.post(
    "/",
    uploadProfileImage.single("background"),
    userController.create
  );
  userRoutes.patch(
    "/:id",
    uploadProfileImage.single("background"),
    userController.update
  );
  userRoutes.delete("/:id", userController.delete);
  userRoutes.get("/:id", userController.getById);

  return userRoutes;
};
export default UserRouter;
