import { string, z } from "zod";

const MemberSchema = z.object({
  member_id: z.string(),
  role: z.enum(["administrador", "colaborador", "invitado"]),
  permissions: z.array(string()),
});

const boardSchema = z.object({
  // Validate title
  title: z.string({
    invalid_type_error: "Title must be a string",
    required_error: "Title is required.",
  }),

  // Validate state
  state: z.boolean({
    required_error: "State is required.",
  }),

  // Validate background color
  background: z.string(),

  // Validate board owner
  user_id: z.string().min(1, { message: "The board owner is required" }),

  // Valiadte members
  members: z.array(MemberSchema),

  // Validate allow background
  allow_background: z.boolean({
    required_error: "Allow background is required.",
  }),

  // Valiadte boards permissions
  board_permissions: z.enum(["Administradores", "Miembros"]),
});

export function validateBoard(input) {
  return boardSchema.safeParse(input);
}

export function validatePartialBoard(input) {
  return boardSchema.partial().safeParse(input);
}
