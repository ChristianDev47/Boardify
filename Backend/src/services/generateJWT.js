import jwt from "jsonwebtoken";

export default function generateTokken({ user }) {
  const userForToken = {
    id: user._id,
    email: user.email,
  };
  // Implementando JWT
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
  });

  const currentDate = new Date();
  const daysToAdd = parseInt(process.env.EXPIRED_TIME);

  const expirationDate = new Date(currentDate);
  expirationDate.setDate(currentDate.getDate() + daysToAdd);

  const expiration = expirationDate.toISOString().split("T")[0];

  return { token, expiration };
}
