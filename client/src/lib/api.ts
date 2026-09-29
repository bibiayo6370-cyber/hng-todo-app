import { getUser, type User } from "./user";
import type { TodoInput, UserInput } from "./schemas";

export type Todo = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
};

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const user = getUser();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(user ? { "x-user-id": user._id } : {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Something went wrong");
  return data as T;
}

export const api = {
  identify: (input: UserInput) =>
    request<User>("/api/users", { method: "POST", body: JSON.stringify(input) }),
  listTodos: () => request<Todo[]>("/api/todos"),
  createTodo: (input: TodoInput) =>
    request<Todo>("/api/todos", { method: "POST", body: JSON.stringify(input) }),
  updateTodo: (id: string, input: Partial<TodoInput> & { completed?: boolean }) =>
    request<Todo>(`/api/todos/${id}`, { method: "PATCH", body: JSON.stringify(input) }),
  deleteTodo: (id: string) =>
    request<{ success: boolean }>(`/api/todos/${id}`, { method: "DELETE" }),
};
