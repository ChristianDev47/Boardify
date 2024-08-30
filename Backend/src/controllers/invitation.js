import { validateBoardInvitation } from "../schemas/validations/boardInvitation.js";
import crypto from "crypto";

class BoardInvitationController {
  constructor({ boardInvitationModel }) {
    this.boardInvitationModel = boardInvitationModel;
  }

  getAll = async (req, res) => {
    try {
      const boardInvitations = await this.boardInvitationModel.getAll();
      res.status(200).json(boardInvitations);
    } catch (error) {
      console.error("Error getting boardInvitations: ", error);
      res.status(404).json({ error: "Error getting boardInvitations" });
    }
  };

  create = async (req, res) => {
    try {
      const result = validateBoardInvitation(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const token = crypto.randomUUID();
      const expiration = new Date(Date.now() + 10 * 60 * 1000);
      const dominio = req.get("referer");
      const { user_id, board_id } = result.data;
      const invitation =
        dominio + "invite/miespaciodetrabajodeuser" + user_id + "-" + token;
      const newInvitation = { invitation, user_id, board_id, expiration };

      const newBoardInvitation = await this.boardInvitationModel.create({
        boardInvitation: newInvitation,
      });
      res.status(201).json(newBoardInvitation);
    } catch (error) {
      console.error("Error creating boardInvitation: ", error);
      res.status(404).json({ error: "Error creating boardInvitation" });
    }
  };

  getById = async (req, res) => {
    try {
      const boardInvitationId = req.params.id;
      const boardInvitations = await this.boardInvitationModel.getById({
        boardInvitationId,
      });
      res.status(200).json(boardInvitations);
    } catch (error) {
      console.error("Error getting boardInvitation: ", error);
      res.status(404).json({ error: "Error getting boardInvitation" });
    }
  };

  getByToken = async (req, res) => {
    try {
      const boardInvitationToken = req.params.token;
      const dominio = req.get("referer");
      const invitationLink = dominio + "invite/" + boardInvitationToken;
      const boardInvitations = await this.boardInvitationModel.getByToken({
        invitationLink,
      });
      res.status(200).json(boardInvitations);
    } catch (error) {
      console.error("Error getting boardInvitation: ", error);
      res.status(404).json({ error: "Error getting boardInvitation" });
    }
  };
}

export default BoardInvitationController;
