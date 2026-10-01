"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { resultadosLinks } from "@/config/site";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue";

type ResultadosMenuProps = {
  /** Contenido del botón que abre el desplegable (icono + texto, lo que sea). */
  children: ReactNode;
  /** Clases del botón disparador, para que encaje en cada lugar donde se usa. */
  triggerClassName: string;
  /** "right" (por defecto) o "left": de qué lado se alinea el panel al abrirse. */
  align?: "right" | "left";
  /** Clases del div contenedor (por defecto se ajusta a su contenido; pásale
   * "h-full w-full" cuando el botón debe llenar una tarjeta/grid como las demás). */
  wrapperClassName?: string;
};

/**
 * El mismo desplegable de "Resultados en línea" del Navbar, reutilizable en
 * cualquier parte del sitio (Hero, Sedes, etc.) para que el botón abra
 * exactamente el mismo menú con los portales reales por sede.
 */
export function ResultadosMenu({
  children,
  triggerClassName,
  align = "right",
  wrapperClassName = "inline-block",
}: ResultadosMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className={`relative ${wrapperClassName}`} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className={triggerClassName}
      >
        {children}
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute top-[calc(100%+0.5rem)] z-50 w-72 overflow-hidden rounded-2xl border border-munoz-navy/10 bg-white py-2 text-left shadow-xl ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <p className="px-4 pb-1.5 pt-1 text-xs font-bold uppercase tracking-wide text-munoz-navy/40">
            Resultados en línea
          </p>
          {resultadosLinks.map((r) => (
            <a
              key={r.href + r.label}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className={`block px-4 py-2.5 text-sm text-munoz-navy/75 transition-colors hover:bg-munoz-mist hover:text-munoz-blue ${focus}`}
            >
              {r.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}