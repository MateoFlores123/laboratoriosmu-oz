"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import { innovations } from "@/config/innovations";
import { labServices } from "@/config/services";
import { useCart } from "@/context/CartContext";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue";

export function InnovationsBanner() {
  const { addItem, removeItem, isInCart, openCart } = useCart();

  return (
    <div className="relative mx-auto mt-10 max-w-[70rem] space-y-5 px-5 lg:px-10">
      {innovations.map((item) => {
        const service = labServices.find((s) => s.id === item.serviceId);
        const inCart = service ? isInCart(service.id) : false;

        return (
          <div
            key={item.id}
            className="relative flex flex-col overflow-hidden rounded-3xl border border-munoz-navy/10 bg-white shadow-sm sm:flex-row"
          >
            <span className="absolute left-4 top-4 z-10 rounded-full bg-munoz-green px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
              Nuevo
            </span>

            <div className="relative h-48 w-full shrink-0 bg-munoz-mist sm:h-auto sm:w-64">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 16rem, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-center gap-3 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-munoz-navy sm:text-2xl">{item.title}</h2>
              <p className="text-sm leading-relaxed text-munoz-navy/60 sm:text-base">{item.description}</p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                {service && (
                  <button
                    type="button"
                    onClick={() => (inCart ? removeItem(service.id) : (addItem(service), openCart()))}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors ${focus} ${
                      inCart
                        ? "bg-munoz-green text-white hover:bg-munoz-green/90"
                        : "bg-munoz-blue text-white hover:bg-munoz-navy"
                    }`}
                  >
                    {inCart ? (
                      <>
                        <Check size={16} aria-hidden /> En el carrito
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} aria-hidden /> Agendar
                      </>
                    )}
                  </button>
                )}
                <Link
                  href={`/servicios/${item.serviceId}`}
                  className={`rounded-full px-2 py-1 text-sm font-semibold text-munoz-blue hover:text-munoz-navy ${focus}`}
                >
                  Ver más información →
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}