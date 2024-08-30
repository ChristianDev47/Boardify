import { z } from "zod";

const checkItemSchema = z.object({
  // Validate title
  title: z.string({
    invalid_type_error: "Title must be a string",
    required_error: "Title is required.",
  }),

  // Validate is checked
  is_checked: z.boolean({
    required_error: "checked is required.",
  }),

  // Validate card id
  card_id: z.string().min(1, { message: "The card id is required" }),
});

export function validateCheckItem(input) {
  return checkItemSchema.safeParse(input);
}

export function validatePartialCheckItem(input) {
  return checkItemSchema.partial().safeParse(input);
}
