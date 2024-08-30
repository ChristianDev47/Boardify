import express, { json } from "express";
import { config } from "dotenv";
import connectDB from "./config/database.js";
import UserRouter from "./routes/userRoutes.js";
import UserModel from "./models/user.js";
import BoardRouter from "./routes/boardRoutes.js";
import BoardModel from "./models/board.js";
import LoginRouter from "./routes/loginRoutes.js";
import LogoutRouter from "./routes/logoutRoutes.js";
import ListRouter from "./routes/listRoutes.js";
import ListModel from "./models/list.js";
import CardRouter from "./routes/cardRoutes.js";
import CardModel from "./models/card.js";
import CheckItemRouter from "./routes/checkItemRoutes.js";
import CheckItemModel from "./models/checkItem.js";
import CardActivityRouter from "./routes/cardActivity.js";
import CardActivityModel from "./models/cardActivity.js";
import CardLabelRouter from "./routes/cardLabelRoutes.js";
import CardFileRouter from "./routes/cardFileRoutes.js";
import CardFileModel from "./models/cardFile.js";

connectDB();
import verifyToken from "./Middlewares/userVerify.js";
import cookieParser from "cookie-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import swaggerDocs from "../documentation/swagger.js";
import { corsMiddlewares } from "./Middlewares/cors.js";
import CardLabelModel from "./models/cardLabel.js";
import ListActivityRouter from "./routes/listActivity.js";
import ListActivityModel from "./models/listActivity.js";
import BoardActivityRouter from "./routes/boardActivity.js";
import BoardActivityModel from "./models/boardActivity.js";
import BoardFileRouter from "./routes/boardFileRoutes.js";
import BoardFileModel from "./models/boardFile.js";
import BoardInvitationRouter from "./routes/invitationRoutes.js";
import BoardInvitationModel from "./models/invitation.js";
import UserFileRouter from "./routes/userFileRoutes.js";
import UserFileModel from "./models/userFile.js";
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

const app = express();
config();
// Middlewares
app.use(json());
app.use(cookieParser());
app.use(corsMiddlewares());

app.use("/api/login", LoginRouter({ userModel: UserModel }));
app.use("/api/logout", verifyToken, LogoutRouter({ userModel: UserModel }));
app.use("/api/users", UserRouter({ userModel: UserModel }));
app.use(
  "/api/users/images",
  express.static(join(CURRENT_DIR, "../src/public/user/profile"))
);
app.use("/api/boards", BoardRouter({ boardModel: BoardModel }));
app.use(
  "/api/invitations",
  BoardInvitationRouter({ boardInvitationModel: BoardInvitationModel })
);
app.use("/api/lists", ListRouter({ listModel: ListModel }));
app.use("/api/cards", CardRouter({ cardModel: CardModel }));
app.use(
  "/api/cards/images",
  express.static(join(CURRENT_DIR, "../src/public/images/background"))
);
app.use("/api/checkItems", CheckItemRouter({ checkItemModel: CheckItemModel }));
app.use(
  "/api/cardActivities",
  CardActivityRouter({ cardActivityModel: CardActivityModel })
);
app.use(
  "/api/listActivities",
  ListActivityRouter({ listActivityModel: ListActivityModel })
);
app.use(
  "/api/boardActivities",
  BoardActivityRouter({ boardActivityModel: BoardActivityModel })
);
app.use("/api/cardLabels", CardLabelRouter({ cardLabelModel: CardLabelModel }));
app.use("/api/cardFiles", CardFileRouter({ cardFileModel: CardFileModel }));
app.use("/api/boardFiles", BoardFileRouter({ boardFileModel: BoardFileModel }));
app.use("/api/userFiles", UserFileRouter({ userFileModel: UserFileModel }));
app.use(
  "/api/cardFiles/files",
  express.static(join(CURRENT_DIR, "../src/public/files/cardFiles"))
);
app.use(
  "/api/boardFiles/files",
  express.static(join(CURRENT_DIR, "../src/public/images/background"))
);
app.use(
  "/api/userFiles/files",
  express.static(join(CURRENT_DIR, "../src/public/user/profile"))
);

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server listening`);
  swaggerDocs(app, process.env.PORT);
});
