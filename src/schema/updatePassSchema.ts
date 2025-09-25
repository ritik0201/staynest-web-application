import { z } from "zod";

export const NewPasswordSchema = z.object({
    newPassword: z
      .string()
    .min(8, {message: "Password must be at least 8 characters"})
    .regex(/[0-9]/, {message: "Password must contain at least one number"})
    .regex(/[!@#$%^&*]/, {message: "Password must contain at least one special character"}),
});

export type RegisterSchemaType = z.infer<typeof NewPasswordSchema>;