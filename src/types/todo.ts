export type Todo = {
  id: string;
  content: string;
  checked: boolean;
};

export type TodoStatus = "all" | "pending" | "completed";
