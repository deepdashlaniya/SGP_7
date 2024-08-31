import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Please enter valid email"),
  password: z.string().min(3, "Please enter password"),
});



export type LoginType = z.infer<typeof LoginSchema>;

