import jwt from "jsonwebtoken";
import { comparePasswords } from "../services/authService.js";
import { serialize } from "cookie";
import generateTokken from "../services/generateJWT.js";
import { compressUser } from "../services/decodeUser.js";

class LoginController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  login = async (req, res) => {
    const { email, password } = req.body;

    const user = await this.userModel.verifyEmail({ userEmail: email });

    let passwordCorrect = false;
    if (user != null) {
      passwordCorrect = await comparePasswords(password, user.password);
    }

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const userForToken = {
      id: user._id,
      email: user.email,
    };

    // Updating JWT
    const { token, expiration } = generateTokken({ user: userForToken });
    const newTokenData = { access_token: token, expiration };
    const updatedToken = await this.userModel.update({
      userId: user._id,
      user: newTokenData,
    });
    if (!updatedToken) return res.json({ error: "Token was not updated" });

    const serializedUser = serialize("user", compressUser(user), {
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serializedUser);

    res.json({
      id: user._id,
      email: user.email,
      token,
    });
  };
}

export default LoginController;
