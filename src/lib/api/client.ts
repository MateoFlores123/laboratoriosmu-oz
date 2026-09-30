// Cliente único para hablar con el backend existente.
// Ningún componente llama fetch directo: todo pasa por aquí (fácil de cambiar/mockear).
const BASE = process.env.NEXT_PUBLIC_API_URL ?? process.env.BACKEND_URL ?? "";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";
