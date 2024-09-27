import { z } from "zod";

export const userSchema = z.object({
  // Validate name
  name: z.string().min(1, "El nombre es requerido."),

  // Validate name
  surname: z.string().min(1, "El apellido es requerido."),

  // Validate email
  email: z.string({ required_error: "El email es requerido." }).email({
    message: "Ingrese un email valido, ejm: user@gmail.com",
  }),

  // Validate password
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "La contraseña debe contener minusculas, mayusculas, numero y simbolos"
    ),
});

export const loginShema = z.object({
  // Validate email
  email: z.string({ required_error: "El email es requerido." }),

  // Validate password
  password: z.string({ required_error: "La contraseña es requerida." }),
});

export const updateUserSchema = z.object({
  // Validate name
  name: z.string().min(1, "El nombre es requerido."),

  // Validate name
  surname: z.string().min(1, "El apellido es requerido."),

  // Validate email
  email: z.string({ required_error: "El email es requerido." }).email({
    message: "Ingrese un email valido, ejm: user@gmail.com",
  }),
});

export const changePassword = z.object({
  // Validate actual password
  password: z
    .string()
    .min(1, "Para cambiar la contraseña debes introducir la actual"),
  // Validate new password
  newPassword: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "La contraseña debe contener minusculas, mayusculas, numero y simbolos"
    ),
});
