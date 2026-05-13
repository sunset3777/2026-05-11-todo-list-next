import { useMemo, useSyncExternalStore } from "react";
import {
  clearAuthStorage,
  getAuthSnapshot,
  setToken,
  setUsername,
  subscribeAuthChange,
} from "@/features/auth/authStorage";

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  username: string;
};

const defaultAuth: AuthState = {
  isLoggedIn: false,
  token: null,
  username: "",
};

function parseAuth(raw: string | null): AuthState {
  if (!raw) return defaultAuth;

  try {
    const parsed = JSON.parse(raw) as Partial<AuthState>;
    const token = parsed.token || null;

    return {
      isLoggedIn: Boolean(token),
      token,
      username: parsed.username || "",
    };
  } catch {
    return defaultAuth;
  }
}

export function useAuth() {
  const authSnapshot = useSyncExternalStore(
    subscribeAuthChange,
    getAuthSnapshot,
    () => ""
  );
  const auth = useMemo(() => parseAuth(authSnapshot), [authSnapshot]);

  const login = (token = "mock-token", username = "王小明") => {
    setToken(token);
    setUsername(username);
  };

  const logout = () => {
    clearAuthStorage();
  };

  return {
    ...auth,
    login,
    logout,
  };
}
