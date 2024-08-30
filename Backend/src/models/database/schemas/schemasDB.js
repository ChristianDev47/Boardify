import { Schema, model } from "mongoose";
import connectDB from "../../../config/database.js";

// Database Conexion
connectDB();

// User Collection
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    surname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    profile: {
      type: String,
    },
    access_token: {
      type: String,
    },
    expiration: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  },
});
const User = model("User", userSchema);

// Board Collection
const boardSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    state: {
      type: Boolean,
    },
    background: {
      type: String,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    board_permissions: {
      type: String,
      enum: ["Administradores", "Miembros"],
    },
    allow_background: {
      type: Boolean,
    },
    members: [
      {
        _id: false,
        member_id: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["administrador", "colaborador", "invitado"],
        },
        permissions: [
          {
            type: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);
boardSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  },
});
const Board = model("Board", boardSchema);

// List Collection
const listSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    position: {
      type: Number,
    },
    board_id: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
  },
  {
    timestamps: true,
  }
);
const List = model("List", listSchema);

// Card Collection
const cardSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    is_active: {
      type: Boolean,
    },
    is_completed: {
      type: Boolean,
    },
    due_date: {
      type: Date,
    },
    initial_date: {
      type: Date,
    },
    background: {
      type: String,
    },
    position: {
      type: Number,
    },
    list_id: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
    members: [
      {
        _id: false,
        member_id: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Card = model("Card", cardSchema);

// CheckItem Collection
const checkItemSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    is_checked: {
      type: Boolean,
    },
    card_id: {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
  },
  {
    timestamps: true,
  }
);
const CheckItem = model("CheckItem", checkItemSchema);

// BoardActivity Collection
const boardActivity = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    activity: {
      type: String,
      require: true,
    },
    board_id: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
  },
  {
    timestamps: true,
  }
);
const BoardActivity = model("BoardActivity", boardActivity);

// ListActivity Collection
const listActivity = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    activity: {
      type: String,
      require: true,
    },
    list_id: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
  },
  {
    timestamps: true,
  }
);
const ListActivity = model("ListActivity", listActivity);

// CardActivity Collection
const cardActivity = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    activity: {
      type: String,
      require: true,
    },
    cardActivity: {
      type: String,
      require: true,
    },
    card_id: {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
  },
  {
    timestamps: true,
  }
);
const CardActivity = model("CardActivity", cardActivity);

// Card Label Collection
const cardLabelSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    background: {
      type: String,
    },
    color: {
      type: String,
    },
    is_active: {
      type: Boolean,
    },
    card_id: {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
  },
  {
    timestamps: true,
  }
);
const CardLabel = model("CardLabel", cardLabelSchema);

// Card Files Collection
const cardFilesSchema = new Schema(
  {
    filename: {
      type: String,
    },
    location: {
      type: String,
    },
    card_id: {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
  },
  {
    timestamps: true,
  }
);
const CardFile = model("CardFile", cardFilesSchema);

// Board Files Collection
const boardFilesSchema = new Schema(
  {
    filename: {
      type: String,
    },
    location: {
      type: String,
    },
    board_id: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
  },
  {
    timestamps: true,
  }
);
const BoardFile = model("BoardFile", boardFilesSchema);

// User Files Collection
const userFilesSchema = new Schema(
  {
    filename: {
      type: String,
    },
    location: {
      type: String,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const UserFile = model("UserFile", userFilesSchema);

// Board Files Collection
const boardInvitationSchema = new Schema(
  {
    invitation: {
      type: String,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    board_id: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    expiration: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const BoardInvitation = model("BoardInvitation", boardInvitationSchema);

export {
  User,
  Board,
  List,
  Card,
  CheckItem,
  BoardActivity,
  ListActivity,
  CardActivity,
  CardLabel,
  CardFile,
  BoardFile,
  BoardInvitation,
  UserFile,
};
