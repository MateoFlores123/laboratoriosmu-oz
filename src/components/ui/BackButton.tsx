"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue";

/**
 * Botón "Volver atrás" genérico: usa el historial del navegador (router.back())
 * en vez de un href fijo, para que funcione sin importar desde dónde llegó la
 * persona (inicio, catálogo de servicios, un enlace compartido, etc.).
 * Si no hay historial (llegó directo por un link externo), cae a /servicios.
 */
export function BackButton({ fallbackHref = "/servicios", label = "Volver" }: { fallbackHref?: string; label?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className={`inline-flex items-center gap-2 rounded-full border border-munoz-navy/15 bg-white px-4 py-2 text-sm font-semibold text-munoz-navy/70 shadow-sm transition-colors hover:border-munoz-blue hover:text-munoz-blue ${focus}`}
    >
      <ArrowLeft size={16} aria-hidden />
      {label}
    </button>
  );
}