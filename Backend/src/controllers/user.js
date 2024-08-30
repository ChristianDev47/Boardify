import {
  validateUser,
  validatePartialUser,
} from "../schemas/validations/user.js";
import { compressUser } from "../services/decodeUser.js";
import { hashPassword } from "../services/encryptPassword.js";
import generateTokken from "../services/generateJWT.js";
import { deleteOldProfileImageUser } from "../services/userImage.js";
import { serialize } from "cookie";

class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  getAll = async (req, res) => {
    try {
      const users = await this.userModel.getAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error getting users: ", error);
      res.status(404).json({ error: "Error getting users" });
    }
  };

  create = async (req, res) => {
    try {
      const result = validateUser(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const { email, password } = result.data;
      const existEmail = await this.userModel.verifyEmail({ userEmail: email });
      if (existEmail) {
        return res
          .status(401)
          .json({ error: "Email is used in other account" });
      }

      const hashedPassword = await hashPassword(password);
      const newUser = {
        ...result.data,
        password: hashedPassword,
      };
      const user = await this.userModel.create({ user: newUser });

      // Creating access_token after create account
      const { token, expiration } = generateTokken({ user });
      const myUser = {
        access_token: token,
        expiration,
      };
      const updatedToken = validatePartialUser(myUser);
      if (!updatedToken.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(updatedToken.error.message) });
      }
      const userCreated = await this.userModel.update({
        userId: user._id,
        user: myUser,
      });

      const serialized = serialize("user", compressUser(userCreated), {
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/",
      });

      res.setHeader("Set-Cookie", serialized);
      res.status(201).json(userCreated);
    } catch (error) {
      console.error("Error creating user: ", error);
      res.status(404).json({ error: "Error creating user" });
    }
  };

  update = async (req, res) => {
    try {
      const userId = req.params.id;
      // Image Verification updated
      if (req.file) {
        // Getting old image to delete
        const user = await this.userModel.getById({ userId });
        deleteOldProfileImageUser(user);
        // Uploading the data of the new image
        // Upload Image
        data = {
          ...result.data,
          profile: req.file.path,
        };
      }
      const result = validatePartialUser(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const { email, password } = result.data;
      if (password) {
        result.data.password = await hashPassword(password);
      }
      if (email) {
        const existEmail = await this.userModel.verifyEmail({
          userEmail: email,
        });
        if (existEmail) {
          return res
            .status(401)
            .json({ error: "Email is used in other account" });
        }
      }
      const users = await this.userModel.update({ userId, user: result.data });
      const serialized = serialize("user", compressUser(users), {
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/",
      });

      res.setHeader("Set-Cookie", serialized);
      res.status(200).json(users);
    } catch (error) {
      console.error("Error updating user: ", error);
      res.status(400).json({ error: "Error updating user" });
    }
  };

  delete = async (req, res) => {
    try {
      const userId = req.params.id;
      // Getting old image to delete
      const user = await this.userModel.getById({ userId });
      deleteOldProfileImageUser(user);
      const users = await this.userModel.delete({ userId });
      res.status(200).json(users);
    } catch (error) {
      console.error("Error deleting user: ", error);
      res.status(404).json({ error: "Error deleting user" });
    }
  };

  getById = async (req, res) => {
    try {
      const userId = req.params.id;
      const users = await this.userModel.getById({ userId });
      res.status(200).json(users);
    } catch (error) {
      console.error("Error getting user: ", error);
      res.status(404).json({ error: "Error getting user" });
    }
  };
}

export default UserController;
