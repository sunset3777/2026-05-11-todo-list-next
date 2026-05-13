import { mapApiTodo, type ApiTodo } from "./todoMapper";

const API_BASE_URL = "https://todolist-api.hexschool.io";

type ApiErrorBody = {
  message?: string;
};

async function parseError(res: Response) {
  try {
    const data = (await res.json()) as ApiErrorBody;
    return data.message || `API request failed: ${res.status}`;
  } catch {
    return `API request failed: ${res.status}`;
  }
}

async function request<T>(
  token: string,
  path: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: token,
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  return res.json() as Promise<T>;
}

export async function getTodos(token: string) {
  const data = await request<{ data: ApiTodo[] }>(token, "/todos", {
    method: "GET",
  });

  return (data.data || []).map(mapApiTodo);
}

export async function createTodo(token: string, content: string) {
  await request<{ data: ApiTodo }>(token, "/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
}

export async function toggleTodo(token: string, id: string) {
  await request<{ data: ApiTodo }>(token, `/todos/${id}/toggle`, {
    method: "PATCH",
  });
}

export async function updateTodo(
  token: string,
  id: string,
  content: string
) {
  await request<{ data: ApiTodo }>(token, `/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
}

export async function deleteTodo(token: string, id: string) {
  await request<{ message: string }>(token, `/todos/${id}`, {
    method: "DELETE",
  });
}
