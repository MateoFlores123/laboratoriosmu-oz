"use client";

import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { LabService } from "@/config/services";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue";

export function ExamDetailActions({ service }: { service: LabService }) {
  const { addItem, removeItem, isInCart, openCart } = useCart();
  const inCart = isInCart(service.id);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => (inCart ? removeItem(service.id) : (addItem(service), openCart()))}
        className={`inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-bold transition-colors ${focus} ${
          inCart
            ? "border-munoz-green bg-munoz-green text-white hover:bg-munoz-green/90"
            : "border-munoz-blue text-munoz-blue hover:bg-munoz-blue hover:text-white"
        }`}
      >
        {inCart ? (
          <>
            <Check size={16} aria-hidden /> En el carrito
          </>
        ) : (
          <>
            <ShoppingCart size={16} aria-hidden /> Agregar al carrito
          </>
        )}
      </button>
      <Link href="/servicios" className={`text-sm font-semibold text-munoz-navy/50 hover:text-munoz-blue ${focus}`}>
        ← Volver a servicios
      </Link>
    </div>
  );
}