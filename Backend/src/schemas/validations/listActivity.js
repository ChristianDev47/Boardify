import { z } from "zod";

const listActivitySchema = z.object({
  // Validate user
  user: z.string(),

  // Validate activity
  activity: z.string(),

  // Validate list id
  list_id: z.number().min(1, { message: "The list id is required" }),
});

export function validateListActivity(input) {
  return listActivitySchema.safeParse(input);
}
