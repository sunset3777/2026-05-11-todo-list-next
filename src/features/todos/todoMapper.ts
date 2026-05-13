import type { Todo } from "@/types/todo";

export type ApiTodo = {
  id: string;
  content: string;
  status: "completed" | "pending";
};

export function mapApiTodo(todo: ApiTodo): Todo {
  return {
    id: todo.id,
    content: todo.content,
    checked: todo.status === "completed",
  };
}
