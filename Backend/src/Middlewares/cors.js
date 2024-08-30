import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:3001",
  "http://localhost:3000",
  "http://localhost:5173",
  "https://boardify-liart.vercel.app",
  "https://boardify-cmdu.onrender.com",
];

export const corsMiddlewares = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  });
