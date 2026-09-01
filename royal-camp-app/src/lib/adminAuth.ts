import { useCallback, useSyncExternalStore } from "react";

const SESSION_KEY = "rc_admin_session";

const ADMIN_ID = import.meta.env.VITE_ADMIN_ID as string | undefined;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;

const listeners = new Set<() => void>();

function getIsAdmin() {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

function setIsAdmin(value: boolean) {
  if (value) sessionStorage.setItem(SESSION_KEY, "true");
  else sessionStorage.removeItem(SESSION_KEY);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAdminAuth() {
  const isAdmin = useSyncExternalStore(subscribe, getIsAdmin);

  const login = useCallback((id: string, password: string) => {
    if (!ADMIN_ID || !ADMIN_PASSWORD) {
      console.error("VITE_ADMIN_ID / VITE_ADMIN_PASSWORD가 .env 파일에 설정되어 있지 않습니다.");
      return false;
    }
    const ok = id === ADMIN_ID && password === ADMIN_PASSWORD;
    if (ok) setIsAdmin(true);
    return ok;
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
  }, []);

  return { isAdmin, loading: false, login, logout };
}
