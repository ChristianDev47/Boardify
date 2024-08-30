import { z } from "zod";

const boardFileSchema = z.object({
  // Validate filename
  filename: z.string(),

  // Validate location
  location: z.string(),

  // Validate board Id
  board_id: z.string().min(1, { message: "The board id is required" }),
});

export function validateBoardFile(input) {
  return boardFileSchema.safeParse(input);
}

export function validatePartialBoardFile(input) {
  return boardFileSchema.partial().safeParse(input);
}
