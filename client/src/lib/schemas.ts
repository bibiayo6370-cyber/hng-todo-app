import { z } from "zod";

export const userSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email("Enter a valid email"),
});

export const todoSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100, "Max 100 characters"),
  description: z.string().trim().max(300, "Max 300 characters"),
});

export type UserInput = z.infer<typeof userSchema>;
export type TodoInput = z.infer<typeof todoSchema>;
