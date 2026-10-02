"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, MapPin, Sparkles, ScanLine, ShoppingCart, Waves, Zap, type LucideIcon } from "lucide-react";
import { innovations } from "@/config/innovations";
import { labServices } from "@/config/services";
import { useCart } from "@/context/CartContext";
import { sedeExclusivaTexto } from "@/lib/sedeDisponibilidad";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue";

const iconById: Record<string, LucideIcon> = {
  ecografo: Waves,
  rayosx: ScanLine,
  quimica: Zap,
};

// Las novedades que SÍ son un servicio (tienen serviceId: ecógrafo, rayos X)
// van como tarjetas normales en grid. "Química e Inmunobioquímica" es un
// anuncio (no se agenda por separado), así que se destaca aparte, como una
// franja ancha y más llamativa.
export function InnovationsBanner() {
  const { addItem, removeItem, isInCart } = useCart();
  const equipos = innovations.filter((i) => i.serviceId);
  const anuncios = innovations.filter((i) => !i.serviceId);

  return (
    <div className="relative mx-auto mt-10 max-w-[78rem] px-5 lg:px-10">
      {/* Anuncios sin servicio propio (química e inmunobioquímica) */}
      {anuncios.map((item) => {
        const Icon = iconById[item.id] ?? Sparkles;
        return (
          <div
            key={item.id}
            className="group relative mb-8 overflow-hidden rounded-[2rem] bg-munoz-navy shadow-xl shadow-munoz-navy/25"
          >
            {/* Resplandores animados de fondo */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-munoz-aqua/25 blur-3xl animate-float-slow"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-munoz-green/25 blur-3xl animate-float-slower"
            />

            <div className="relative grid gap-0 sm:grid-cols-[1.1fr_1.4fr] lg:grid-cols-[1fr_1.6fr]">
              <div className="relative h-48 w-full sm:h-full">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 34rem, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-r from-munoz-navy/10 via-munoz-navy/40 to-munoz-navy sm:bg-linear-to-r" />
              </div>

              <div className="relative flex flex-col justify-center gap-3 p-7 sm:p-9">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-munoz-green px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                  Anuncio · Nueva tecnología
                </span>

                <h2 className="flex items-center gap-2.5 text-2xl font-bold text-white sm:text-3xl">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md animate-pulse-ring">
                    <Icon size={20} aria-hidden />
                  </span>
                  {item.title}
                </h2>

                <p className="max-w-xl text-[15px] leading-relaxed text-white/75">{item.description}</p>

                {item.badge && (
                  <p className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-munoz-aqua">
                    <MapPin size={13} aria-hidden /> {item.badge}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Equipos con servicio propio (ecógrafo, rayos X) */}
      <div className="grid gap-6 sm:grid-cols-2">
        {equipos.map((item) => {
          const Icon = iconById[item.id] ?? Sparkles;
          const service = labServices.find((s) => s.id === item.serviceId);
          const inCart = service ? isInCart(service.id) : false;
          const notaSede = service ? sedeExclusivaTexto(service) : null;

          return (
            <div
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-munoz-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-munoz-navy/10"
            >
              <div className="relative h-44 w-full shrink-0 overflow-hidden bg-munoz-mist">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-munoz-navy/45 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-munoz-green px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
                  <Sparkles size={11} aria-hidden /> Nuevo
                </span>
                <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md">
                  <Icon size={18} aria-hidden />
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-2.5 p-6">
                <h2 className="text-lg font-bold text-munoz-navy">{item.title}</h2>
                <p className="flex-1 text-sm leading-relaxed text-munoz-navy/60">{item.description}</p>

                {notaSede && (
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-munoz-green">
                    <MapPin size={13} aria-hidden /> {notaSede}
                  </p>
                )}

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {service && (
                    <button
                      type="button"
                      onClick={() => (inCart ? removeItem(service.id) : addItem(service))}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${focus} ${
                        inCart
                          ? "bg-munoz-green text-white hover:bg-munoz-green/90"
                          : "bg-munoz-blue text-white hover:bg-munoz-navy"
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check size={15} aria-hidden /> En el carrito
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={15} aria-hidden /> Agendar
                        </>
                      )}
                    </button>
                  )}
                  {service && (
                    <Link
                      href={`/servicios/${item.serviceId}`}
                      className={`rounded-full px-1.5 py-1 text-sm font-semibold text-munoz-blue hover:text-munoz-navy ${focus}`}
                    >
                      Ver más →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}