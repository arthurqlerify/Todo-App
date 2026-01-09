import { z } from "zod";

export const todoSchema = z.object({
  id: z.string().min(1, "ID is required"),
  task: z.string().min(1, "Task is required"),
  createdAt: z.string().datetime({ message: "Invalid date format" }), // Required as per OpenAPI Todo schema
  updatedAt: z.string().datetime({ message: "Invalid date format" }), // Required as per OpenAPI Todo schema
});

export const createTodoRequestSchema = todoSchema.pick({ task: true });

export const updateTodoRequestSchema = todoSchema.pick({ id: true, task: true });

export const deleteTodoRequestSchema = todoSchema.pick({ id: true });

// Schema for fetching a todo by ID, assuming 'id' is a query parameter
export const getTodoByIdRequestSchema = z.object({
  id: z.string().min(1, "Todo ID is required"),
});

export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoRequest = z.infer<typeof createTodoRequestSchema>;
export type UpdateTodoRequest = z.infer<typeof updateTodoRequestSchema>;
export type DeleteTodoRequest = z.infer<typeof deleteTodoRequestSchema>;
export type GetTodoByIdRequest = z.infer<typeof getTodoByIdRequestSchema>;