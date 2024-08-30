import { z } from "zod";

const boardActivitySchema = z.object({
  // Validate user
  user: z.string(),

  // Validate activity
  activity: z.string(),

  // Validate board id
  board_id: z.number().min(1, { message: "The board id is required" }),
});

export function validateBoardActivity(input) {
  return boardActivitySchema.safeParse(input);
}
