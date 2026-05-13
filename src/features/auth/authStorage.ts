const TOKEN_KEY = "token";
const USERNAME_KEY = "todo.username";
export const AUTH_CHANGE_EVENT = "todo-auth-change";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  notifyAuthChange();
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  notifyAuthChange();
}

export function getUsername() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(USERNAME_KEY) || "";
}

export function setUsername(username: string) {
  localStorage.setItem(USERNAME_KEY, username);
  notifyAuthChange();
}

export function removeUsername() {
  localStorage.removeItem(USERNAME_KEY);
  notifyAuthChange();
}

export function clearAuthStorage() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  notifyAuthChange();
}

export function notifyAuthChange() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function subscribeAuthChange(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
  };
}

export function getAuthSnapshot() {
  if (typeof window === "undefined") return "";

  return JSON.stringify({
    token: getToken(),
    username: getUsername(),
  });
}
