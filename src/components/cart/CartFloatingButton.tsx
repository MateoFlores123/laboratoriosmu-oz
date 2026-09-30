"use client";

import { ClipboardList } from "lucide-react";
import { useCart } from "@/context/CartContext";

// Botón flotante global: aparece en cualquier página en cuanto hay algo en
// el carrito, y abre el panel lateral (no navega a otra página).
// Se ubica por encima del asistente flotante (que vive en bottom-0 right-0)
// para que no se encimen.
export function CartFloatingButton() {
  const { items, openCart } = useCart();

  if (items.length === 0) return null;

  return (
    <button
      type="button"
      onClick={openCart}
      className="fixed bottom-24 right-5 z-40 flex items-center gap-2 rounded-full bg-munoz-navy px-5 py-3 text-sm font-bold text-white shadow-lg shadow-munoz-navy/25 transition-transform hover:-translate-y-0.5 hover:bg-munoz-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8"
    >
      <ClipboardList size={17} aria-hidden />
      Ver carrito
      <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white/20 px-1.5 text-xs font-bold">
        {items.length}
      </span>
    </button>
  );
}