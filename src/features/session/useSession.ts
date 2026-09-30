"use client";
import { USE_MOCKS } from "@/lib/api/client";

export type SessionInfo = {
  user: { name: string } | null; // null = visitante
  quoteCount: number; // ítems en la cotización
};

// TODO(backend): reemplazar por api<SessionInfo>("/session") (ej. GET /api/me + carrito de cotización).
export function useSession(): SessionInfo {
  if (USE_MOCKS) return { user: null, quoteCount: 0 };
  return { user: null, quoteCount: 0 };
}
