import jwt from "jsonwebtoken";
import { serialize } from "cookie";

class LogoutController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  logout = async (req, res) => {
    const { sesion_security_token } = req.cookies;
    if (!sesion_security_token) {
      return res.status(401).json({ error: "user not authenticated" });
    }
    try {
      const verified = jwt.verify(sesion_security_token, process.env.SECRET);
      const serialized = serialize("user", null, {
        secure: true,
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      });
      res.setHeader("Set-Cookie", serialized);
      res.status(200).json({ message: "logout succesfully" });
    } catch (error) {
      return res.status(401).json({ erro: "Invalid token" });
    }
  };
}

export default LogoutController;
