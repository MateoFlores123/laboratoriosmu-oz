"use client";

import Link from "next/link";
import { Check, MapPin, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { LabService } from "@/config/services";
import { sedeExclusivaTexto } from "@/lib/sedeDisponibilidad";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue";

export function ExamDetailActions({ service }: { service: LabService }) {
  const { addItem, removeItem, isInCart } = useCart();
  const inCart = isInCart(service.id);
  const notaSede = sedeExclusivaTexto(service);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => (inCart ? removeItem(service.id) : addItem(service))}
          className={`group inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-bold transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] ${focus} ${
            inCart
              ? "border-munoz-green bg-munoz-green text-white shadow-md shadow-munoz-green/25 hover:bg-munoz-green/90"
              : "border-munoz-blue text-munoz-blue hover:bg-munoz-blue hover:text-white hover:shadow-md hover:shadow-munoz-blue/25"
          }`}
        >
          {inCart ? (
            <>
              <Check size={16} aria-hidden className="transition-transform duration-300 group-hover:scale-110" /> En el carrito
            </>
          ) : (
            <>
              <ShoppingCart size={16} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-8deg]" />{" "}
              Agregar al carrito
            </>
          )}
        </button>
        <Link
          href="/servicios"
          className={`group inline-flex items-center gap-1 text-sm font-semibold text-munoz-navy/50 transition-colors hover:text-munoz-blue ${focus}`}
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> Volver a servicios
        </Link>
      </div>

      {notaSede && (
        <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-munoz-navy/60">
          <MapPin size={14} className="shrink-0 text-munoz-green" aria-hidden /> {notaSede}
        </p>
      )}
    </div>
  );
}