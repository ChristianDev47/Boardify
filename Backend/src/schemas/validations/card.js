import { z } from "zod";

const MemberSchema = z.object({
  member_id: z.string(),
});

const cardSchema = z.object({
  // Validate name
  name: z.string({
    invalid_type_error: "Name must be a string",
    required_error: "Name is required.",
  }),

  // Validate description
  description: z.string({
    invalid_type_error: "Description must be a string",
    required_error: "Description is required.",
  }),

  // Validate if the card is active
  is_active: z.boolean(),

  // Validate due date
  due_date: z.string().nullable(),

  // Validate initial date
  initial_date: z.string().nullable(),

  // Validate is completed
  is_completed: z.boolean(),

  // Validate text color
  text_color: z.string(),

  // Validate background color
  background: z.string().nullable(),

  // Validate position
  position: z.number().min(1, { message: "The position is required" }),

  // Validate list
  list_id: z.string().min(1, { message: "The list id is required" }),

  // Valiadte members
  members: z.array(MemberSchema),
});

export function validateCard(input) {
  return cardSchema.safeParse(input);
}

export function validatePartialCard(input) {
  return cardSchema.partial().safeParse(input);
}
