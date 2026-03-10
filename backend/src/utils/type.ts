import { z } from "zod";

export const registerSchema = z.object({
    email: z.email(),
    name: z.string().optional(),
    password: z.string().min(6),
});
