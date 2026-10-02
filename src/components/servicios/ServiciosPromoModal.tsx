"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ScanLine,
  ShoppingCart,
  Sparkles,
  Waves,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { innovations } from "@/config/innovations";
import { labServices } from "@/config/services";
import { useCart } from "@/context/CartContext";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue";

// Se muestra una sola vez por sesión del navegador (se vuelve a mostrar si
// cierra la pestaña y vuelve otro día). Para que sea "una sola vez, siempre"
// bastaría con cambiar sessionStorage por localStorage aquí abajo.
const SESSION_KEY = "munoz-servicios-promo-visto";

const iconById: Record<string, LucideIcon> = {
  ecografo: Waves,
  rayosx: ScanLine,
  quimica: Zap,
};

// Igual que en CartContext.tsx: leer sessionStorage es sincronizarse con
// algo externo a React (y que no existe en el servidor), así que se usa
// useSyncExternalStore en vez de un useEffect que llama setState directo en
// su cuerpo — eso es justo el patrón que React marca como advertencia
// ("Calling setState synchronously within an Effect...").
function quiereMostrarse(): boolean {
  try {
    return !sessionStorage.getItem(SESSION_KEY);
  } catch {
    return false;
  }
}
function getServerSnapshot() {
  // En el servidor no hay sessionStorage: arranca cerrado ahí, y
  // useSyncExternalStore se encarga de "ponerse al día" apenas hidrata.
  return false;
}
function subscribe() {
  // No hay un evento externo que lo cambie (sessionStorage no dispara
  // "storage" en la misma pestaña), así que no hace falta escuchar nada.
  return () => {};
}

// Aviso/anuncio de las 3 novedades (ecógrafo, rayos X, química e
// inmunobioquímica) que aparece la primera vez que se entra a /servicios en
// la sesión. Al cerrarlo (X o clic afuera), debajo ya están las 3 tarjetas
// de InnovationsBanner — este modal solo es la "vitrina" inicial.
export function ServiciosPromoModal() {
  const { addItem, isInCart, openCart } = useCart();
  const quiereMostrar = useSyncExternalStore(subscribe, quiereMostrarse, getServerSnapshot);
  const [cerradoManualmente, setCerradoManualmente] = useState(false);
  const [index, setIndex] = useState(0);
  const total = innovations.length;
  const open = quiereMostrar && !cerradoManualmente;

  function close() {
    setCerradoManualmente(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // se ignora si el navegador bloquea el guardado
    }
  }

  function goTo(i: number) {
    setIndex(((i % total) + total) % total);
  }

  if (!open) return null;

  const item = innovations[index];
  const Icon = iconById[item.id] ?? Sparkles;
  const service = labServices.find((s) => s.id === item.serviceId);
  const inCart = service ? isInCart(service.id) : false;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Novedades del laboratorio"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-munoz-navy/70" onClick={close} />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar aviso"
          className={`absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/30 ${focus}`}
        >
          <X size={20} aria-hidden />
        </button>

        <div className="relative h-[22rem] w-full bg-munoz-mist sm:h-[26rem]">
          <Image key={item.id} src={item.image} alt={item.alt} fill sizes="42rem" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-munoz-navy/80 via-munoz-navy/20 to-transparent" />
          <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-munoz-green px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-white shadow">
            <Sparkles size={14} aria-hidden /> Nuevo
          </span>
          <span className="absolute bottom-6 left-6 grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md">
            <Icon size={22} aria-hidden />
          </span>

          {/* Flechas para pasar entre los 3 anuncios */}
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Anuncio anterior"
            className={`absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25 ${focus}`}
          >
            <ArrowLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Siguiente anuncio"
            className={`absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25 ${focus}`}
          >
            <ArrowRight size={18} aria-hidden />
          </button>
        </div>

        <div className="p-7 sm:p-9">
          <h2 className="text-2xl font-bold text-munoz-navy sm:text-3xl">{item.title}</h2>
          <p className="mt-3 text-base leading-relaxed text-munoz-navy/60">{item.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {service && (
              <button
                type="button"
                onClick={() => {
                  if (!inCart) addItem(service);
                  openCart();
                  close();
                }}
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
            {item.serviceId ? (
              <Link
                href={`/servicios/${item.serviceId}`}
                onClick={close}
                className={`rounded-full px-1.5 py-1 text-sm font-semibold text-munoz-blue hover:text-munoz-navy ${focus}`}
              >
                Ver más información →
              </Link>
            ) : (
              item.badge && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-munoz-green/30 bg-munoz-green/8 px-4 py-2 text-sm font-semibold text-munoz-green">
                  <Check size={14} aria-hidden /> {item.badge}
                </span>
              )
            )}
          </div>

          {/* Puntos: a cuál de las 3 novedades se está viendo */}
          <div className="mt-7 flex items-center justify-center gap-2">
            {innovations.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ver: ${s.title}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${focus} ${
                  i === index ? "w-7 bg-munoz-blue" : "w-2 bg-munoz-navy/15 hover:bg-munoz-navy/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}