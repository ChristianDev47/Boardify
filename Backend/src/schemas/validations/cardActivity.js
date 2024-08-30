import { z } from "zod";

const cardActivitySchema = z.object({
  // Validate user
  user: z.string(),

  // Validate activity
  activity: z.string(),

  // Validate card activity
  cardActivity: z.string(),

  // Validate card id
  card_id: z.number().min(1, { message: "The card id is required" }),
});

export function validateCardActivity(input) {
  return cardActivitySchema.safeParse(input);
}
