import { z } from "zod";

const cardFileSchema = z.object({
  // Validate filename
  filename: z.string(),

  // Validate location
  location: z.string(),

  // Validate card Id
  card_id: z.string().min(1, { message: "The card id is required" }),
});

export function validateCardFile(input) {
  return cardFileSchema.safeParse(input);
}

export function validatePartialCardFile(input) {
  return cardFileSchema.partial().safeParse(input);
}
