const SESSION_KEY = "dtf_auth";
const ROLE_KEY = "dtf_role";

const CREDENTIALS = [
  { user: "dtfinance", pass: "kankaslilas", role: "cliente" },
  { user: "dtinterno", pass: "dt@interno2025", role: "interno" },
];

export type UserRole = "cliente" | "interno";

export function login(user: string, pass: string): false | UserRole {
  const match = CREDENTIALS.find(c => c.user === user && c.pass === pass);
  if (match) {
    sessionStorage.setItem(SESSION_KEY, "1");
    sessionStorage.setItem(ROLE_KEY, match.role);
    return match.role as UserRole;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(ROLE_KEY);
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

export function getRole(): UserRole | null {
  const r = sessionStorage.getItem(ROLE_KEY);
  if (r === "cliente" || r === "interno") return r;
  return null;
}

export function isInterno(): boolean {
  return getRole() === "interno";
}
