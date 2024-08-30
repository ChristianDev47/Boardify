import { z } from "zod";

const userFileSchema = z.object({
  // Validate filename
  filename: z.string(),

  // Validate location
  location: z.string(),

  // Validate user Id
  user_id: z.string().min(1, { message: "The user id is required" }),
});

export function validateUserFile(input) {
  return userFileSchema.safeParse(input);
}

export function validatePartialUserFile(input) {
  return userFileSchema.partial().safeParse(input);
}
