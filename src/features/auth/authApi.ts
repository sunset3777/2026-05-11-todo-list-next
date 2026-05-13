const API_BASE_URL = "https://todolist-api.hexschool.io";

type ApiErrorBody = {
  message?: string;
};

type SignInResponse = {
  token: string;
  nickname?: string;
};

async function parseError(res: Response) {
  try {
    const data = (await res.json()) as ApiErrorBody;
    return data.message || `API request failed: ${res.status}`;
  } catch {
    return `API request failed: ${res.status}`;
  }
}

async function request<T>(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, options);

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  return res.json() as Promise<T>;
}

export function signUp(payload: {
  email: string;
  password: string;
  nickname: string;
}) {
  return request<{ message: string }>("/users/sign_up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export function signIn(payload: { email: string; password: string }) {
  return request<SignInResponse>("/users/sign_in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function checkAuth(token: string) {
  await request<{ message: string }>("/users/checkout", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
}

export async function signOut(token: string) {
  await request<{ message: string }>("/users/sign_out", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
}
