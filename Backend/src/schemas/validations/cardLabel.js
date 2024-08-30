import { z } from "zod";

const cardLabelSchema = z.object({
  // Validate name
  name: z.string({
    invalid_type_error: "Name must be a string",
    required_error: "Name is required.",
  }),

  // Validate background
  background: z.string(),

  // Validate color
  color: z.string(),

  // Validate color
  is_active: z.boolean({
    required_error: "checked is required.",
  }),

  // Validate card id
  card_id: z.string().min(1, { message: "The card id is required" }),
});

export function validateCardLabel(input) {
  return cardLabelSchema.safeParse(input);
}

export function validatePartialCardLabel(input) {
  return cardLabelSchema.partial().safeParse(input);
}
