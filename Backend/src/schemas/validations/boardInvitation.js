import { z } from "zod";
const boardInvitationSchema = z.object({
  // Validate user id
  user_id: z.string().min(1, { message: "The user id is required" }),
  // Validate board owner
  board_id: z.string().min(1, { message: "The board id is required" }),
});

export function validateBoardInvitation(input) {
  return boardInvitationSchema.safeParse(input);
}
