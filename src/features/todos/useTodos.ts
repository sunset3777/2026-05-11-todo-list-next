import { useMemo, useSyncExternalStore } from "react";
import type { RefObject } from "react";
import type { Todo, TodoStatus } from "@/types/todo";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  updateTodo,
} from "./todoApi";

type UseTodosOptions = {
  token: string | null;
  status: TodoStatus;
  inputRef?: RefObject<HTMLInputElement | null>;
};

type TodosState = {
  todos: Todo[];
  isLoading: boolean;
  error: string;
  token: string | null;
};

let todosState: TodosState = {
  todos: [],
  isLoading: false,
  error: "",
  token: null,
};

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function setTodosState(nextState: Partial<TodosState>) {
  todosState = {
    ...todosState,
    ...nextState,
  };
  emitChange();
}

function subscribeTodos(callback: () => void) {
  listeners.add(callback);

  return () => {
    listeners.delete(callback);
  };
}

function getTodosSnapshot() {
  return todosState;
}

function getTodosServerSnapshot() {
  return {
    todos: [],
    isLoading: false,
    error: "",
    token: null,
  };
}

export function useTodos({ token, status, inputRef }: UseTodosOptions) {
  const { todos, isLoading, error } = useSyncExternalStore(
    subscribeTodos,
    getTodosSnapshot,
    getTodosServerSnapshot
  );

  if (token !== todosState.token && !todosState.isLoading) {
    setTodosState({
      token,
      todos: [],
      error: "",
    });

    if (token) {
      void loadTodosForToken(token);
    }
  }

  const loadTodos = async () => {
    if (!token) return;

    await loadTodosForToken(token);
  };

  const handleAdd = async (text: string) => {
    const content = text.trim();
    if (!content || !token) return;

    try {
      setTodosState({ error: "" });
      await createTodo(token, content);
      await loadTodos();
      inputRef?.current?.focus();
    } catch (err) {
      setTodosState({
        error: err instanceof Error ? err.message : "新增失敗",
      });
    }
  };

  const handleToggle = async (id: string) => {
    if (!token) return;

    try {
      setTodosState({
        error: "",
        todos: todosState.todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        ),
      });
      await toggleTodo(token, id);
    } catch (err) {
      setTodosState({
        error: err instanceof Error ? err.message : "同步失敗",
      });
      await loadTodos();
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;

    try {
      setTodosState({
        error: "",
        todos: todosState.todos.filter((todo) => todo.id !== id),
      });
      await deleteTodo(token, id);
    } catch (err) {
      setTodosState({
        error: err instanceof Error ? err.message : "刪除失敗",
      });
      await loadTodos();
    }
  };

  const handleEdit = async (id: string, nextContent: string) => {
    const content = nextContent.trim();
    if (!content || !token) return;

    try {
      setTodosState({ error: "" });
      await updateTodo(token, id, content);
      setTodosState({
        todos: todosState.todos.map((todo) =>
          todo.id === id ? { ...todo, content } : todo
        ),
      });
    } catch (err) {
      setTodosState({
        error: err instanceof Error ? err.message : "編輯失敗",
      });
      await loadTodos();
    }
  };

  const handleClearCompleted = async () => {
    if (!token) return;

    const completedItems = todos.filter((todo) => todo.checked);

    try {
      setTodosState({
        isLoading: true,
        error: "",
      });
      await Promise.all(
        completedItems.map((todo) => deleteTodo(token, todo.id))
      );
      await loadTodos();
    } catch (err) {
      setTodosState({
        error: err instanceof Error ? err.message : "清除失敗",
      });
    } finally {
      setTodosState({ isLoading: false });
    }
  };

  const filteredTodos = useMemo<Todo[]>(() => {
    return todos.filter((todo) => {
      if (status === "all") return true;
      if (status === "pending") return !todo.checked;
      if (status === "completed") return todo.checked;
      return true;
    });
  }, [todos, status]);

  const pendingCount = useMemo(
    () => todos.filter((todo) => !todo.checked).length,
    [todos]
  );

  return {
    todos,
    filteredTodos,
    pendingCount,
    isLoading,
    error,
    handleAdd,
    handleToggle,
    handleDelete,
    handleEdit,
    handleClearCompleted,
  };
}

async function loadTodosForToken(token: string) {
  try {
    setTodosState({
      isLoading: true,
      error: "",
    });
    const nextTodos = await getTodos(token);
    setTodosState({
      todos: nextTodos,
    });
  } catch (err) {
    setTodosState({
      error: err instanceof Error ? err.message : "讀取待辦失敗",
    });
  } finally {
    setTodosState({
      isLoading: false,
    });
  }
}
