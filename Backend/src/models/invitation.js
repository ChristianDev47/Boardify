import {
  BoardActivity,
  BoardInvitation,
} from "./database/schemas/schemasDB.js";

class BoardInvitationModel {
  // GET ALL
  static async getAll() {
    try {
      const boardInvitations = await BoardInvitation.find()
        .populate("user_id")
        .populate("board_id")
        .exec();
      return boardInvitations;
    } catch (error) {
      throw new Error("Error getting boardInvitations: ", error);
    }
  }

  // CREATE BOARD INVITATION
  static async create({ boardInvitation }) {
    try {
      const newBoardInvitation = await BoardInvitation.create(boardInvitation);
      return newBoardInvitation;
    } catch (error) {
      throw new Error("Error creating boardInvitation: ", error);
    }
  }

  // FIND BOARD INVITATION BY ID
  static async getById({ boardInvitationId }) {
    try {
      const boardInvitation = await BoardInvitation.findById(boardInvitationId)
        .populate("user_id")
        .populate("board_id")
        .exec();
      if (boardInvitation !== null) {
        return boardInvitation;
      } else {
        throw new Error("BoardInvitation not found");
      }
    } catch (error) {
      throw new Error("Error getting boardInvitation: ", error);
    }
  }

  // FIND BOARD INVITATION BY TOKEN
  static async getByToken({ invitationLink }) {
    try {
      const boardInvitation = await BoardInvitation.find({
        invitation: invitationLink,
      })
        .populate("user_id")
        .populate("board_id")
        .exec();
      if (boardInvitation !== null) {
        return boardInvitation;
      } else {
        throw new Error("BoardInvitation not found");
      }
    } catch (error) {
      throw new Error("Error getting boardInvitation: ", error);
    }
  }
}

export default BoardInvitationModel;
