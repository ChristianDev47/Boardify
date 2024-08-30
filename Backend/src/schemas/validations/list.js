import { z } from "zod";

const listSchema = z.object({
  // Validate name
  name: z.string({
    invalid_type_error: "Name must be a string",
    required_error: "Name is required.",
  }),

  // Validate position
  position: z.number().min(1, { message: "The position is required" }),

  // Validate board id
  board_id: z.string().min(1, { message: "The board is required" }),
});

export function validateList(input) {
  return listSchema.safeParse(input);
}

export function validatePartialList(input) {
  return listSchema.partial().safeParse(input);
}
