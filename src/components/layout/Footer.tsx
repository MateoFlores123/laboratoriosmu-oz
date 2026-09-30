"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  CalendarPlus,
  ChevronRight,
  MapPin,
  MessageCircle,
  Phone,
  ShoppingCart,
} from "lucide-react";
import { brand, locations, navLinks, social, assistant } from "@/config/site";
import { useCart } from "@/context/CartContext";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-aqua";

// lucide-react ya no trae íconos de marcas, así que estos son propios.
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.8h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.14C15.9 4.1 15 4 13.9 4c-2.3 0-3.9 1.4-3.9 4v2.2H7.4v3h2.6V21h3.5Z" />
    </svg>
  );
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 8.6a3 3 0 0 0-2.1-2.1C18.1 6 12 6 12 6s-6.1 0-7.9.5A3 3 0 0 0 2 8.6 31 31 0 0 0 1.5 12a31 31 0 0 0 .5 3.4 3 3 0 0 0 2.1 2.1C5.9 18 12 18 12 18s6.1 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.1.5-2.3.5-3.4a31 31 0 0 0-.5-3.4ZM10 14.7V9.3l5 2.7-5 2.7Z" />
    </svg>
  );
}

// Encabezado de columna: blanco y limpio, con una rayita de acento —
// discreto, en vez de texto en color brillante que grita sobre el fondo oscuro.
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-base font-bold text-white">{children}</h3>
      <span aria-hidden className="mt-2 block h-1 w-8 rounded-full bg-linear-to-r from-munoz-green via-munoz-blue to-munoz-aqua" />
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappUrl = "https://wa.me/" + assistant.whatsapp;
  const { openCart } = useCart();

  return (
    <footer className="relative mx-3 overflow-hidden rounded-t-[2.5rem] bg-munoz-navy text-white/70 shadow-2xl shadow-munoz-navy/30 sm:mx-6 sm:rounded-t-[3rem] lg:mx-10">
      {/* Franja de color arriba, la misma que usa el resto del sitio (hero,
          tarjetas de innovaciones), para que el footer se sienta parte de
          la misma marca y no un bloque aparte. */}
      <div aria-hidden className="h-2 w-full bg-linear-to-r from-munoz-green via-munoz-blue to-munoz-aqua" />

      {/* Brillos suaves, sutiles, para no dejar el navy plano */}
      <div aria-hidden className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-munoz-aqua/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-munoz-green/10 blur-3xl" />

      {/* Ondas celestes, elegantes y discretas, de fondo en todo el footer */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 560"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      >
        <path d="M0 90 C 260 40, 480 140, 760 85 S 1220 30, 1440 95" fill="none" stroke="var(--color-munoz-aqua)" strokeWidth="1.5" strokeOpacity="0.22" />
        <path d="M0 180 C 280 120, 520 230, 780 165 S 1240 100, 1440 175" fill="none" stroke="var(--color-munoz-aqua)" strokeWidth="1.5" strokeOpacity="0.16" />
        <path d="M0 480 C 260 530, 500 430, 780 490 S 1220 540, 1440 470" fill="none" stroke="var(--color-munoz-aqua)" strokeWidth="1.5" strokeOpacity="0.16" />
      </svg>

      <div className="relative mx-auto max-w-[90rem] px-5 pb-14 pt-16 lg:px-10">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.85fr_1.1fr_1fr] lg:gap-10">
          {/* Marca */}
          <div>
            {/* Logo sobre una tarjeta blanca: así se ve bien sin depender de
                que exista una versión "clara" del logo todavía. */}
            <div className="inline-flex rounded-2xl bg-white px-5 py-4 shadow-lg">
              <Image src={brand.logo} alt={brand.name} width={190} height={70} className="h-16 w-auto" />
            </div>
            <p className="mt-6 max-w-xs text-base leading-relaxed text-white/60">
              30 años de experiencia en tecnología médica a nivel de las grandes ciudades del mundo.
            </p>

            <div className="mt-7 flex gap-3">
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
                className={`grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-munoz-aqua hover:text-munoz-navy ${focus}`}
              >
                <FacebookIcon width={18} height={18} />
              </a>
              {/* TODO: reemplazar "#" por los enlaces reales cuando existan estas cuentas */}
              <a
                href="#"
                aria-label="Síguenos en Instagram"
                className={`grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-munoz-aqua hover:text-munoz-navy ${focus}`}
              >
                <InstagramIcon width={18} height={18} />
              </a>
              <a
                href="#"
                aria-label="Síguenos en YouTube"
                className={`grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-munoz-aqua hover:text-munoz-navy ${focus}`}
              >
                <YoutubeIcon width={18} height={18} />
              </a>
            </div>
          </div>

          {/* Enlaces */}
          <nav aria-label="Enlaces del pie de página">
            <ColumnHeading>Enlaces</ColumnHeading>
            <ul className="flex flex-col gap-3.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`flex items-center gap-1.5 text-base text-white/70 hover:text-munoz-aqua ${focus}`}>
                    <ChevronRight size={16} className="text-munoz-aqua" aria-hidden />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sedes */}
          <div>
            <ColumnHeading>Sedes</ColumnHeading>
            <div className="space-y-5">
              <div>
                <p className="flex items-center gap-2 text-base font-semibold text-white">
                  <MapPin size={16} className="text-munoz-green" aria-hidden /> Arequipa
                </p>
                <ul className="mt-2 space-y-1.5 pl-[1.4rem] text-[15px] text-white/60">
                  {locations.arequipa.sedes.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="flex items-center gap-2 text-base font-semibold text-white">
                  <MapPin size={16} className="text-munoz-green" aria-hidden /> Lima
                </p>
                <ul className="mt-2 space-y-1.5 pl-[1.4rem] text-[15px] text-white/60">
                  {locations.lima.sedes.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              href="/sedes"
              className={`group mt-5 inline-flex items-center gap-1 text-base font-semibold text-munoz-aqua hover:text-white ${focus}`}
            >
              Ver todas las sedes
              <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>

          {/* Contacto */}
          <div>
            <ColumnHeading>Contacto</ColumnHeading>
            <ul className="space-y-3 text-base">
              <li>
                <a
                  href={`tel:+51${locations.arequipa.phone}`}
                  className={`flex items-center gap-2 text-white/70 hover:text-munoz-aqua ${focus}`}
                >
                  <Phone size={16} className="text-munoz-aqua" aria-hidden />
                  Arequipa: {locations.arequipa.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`tel:+51${locations.lima.phone}`}
                  className={`flex items-center gap-2 text-white/70 hover:text-munoz-aqua ${focus}`}
                >
                  <Phone size={16} className="text-munoz-aqua" aria-hidden />
                  Lima: {locations.lima.phoneDisplay}
                </a>
              </li>
            </ul>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-flex items-center gap-2 rounded-full bg-munoz-green px-5 py-2.5 text-base font-semibold text-white shadow-md shadow-munoz-green/25 transition-colors hover:opacity-90 ${focus}`}
            >
              <MessageCircle size={17} aria-hidden /> WhatsApp
              <ChevronRight size={17} aria-hidden />
            </a>

            <div className="mt-6 flex items-center gap-4 text-base">
              <Link
                href="/servicios"
                className={`flex items-center gap-1.5 font-medium text-white/70 hover:text-munoz-aqua ${focus}`}
              >
                <CalendarPlus size={16} aria-hidden /> Agendar
              </Link>
              <span aria-hidden className="h-4 w-px bg-white/20" />
              <button
                type="button"
                onClick={openCart}
                className={`flex items-center gap-1.5 font-medium text-white/70 hover:text-munoz-aqua ${focus}`}
              >
                <ShoppingCart size={16} aria-hidden /> Cotizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Franja inferior: mismo tono navy, solo separada por un borde sutil
          (sin salto de color abrupto). */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[90rem] flex-col-reverse items-center justify-between gap-3 px-5 py-6 text-sm text-white/50 sm:flex-row lg:px-10">
          <p>© {year} Laboratorios Muñoz. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3">
            <span aria-hidden className="hidden h-4 w-px bg-white/20 sm:block" />
            <p className="flex items-center gap-1.5">
              <Activity size={15} className="text-munoz-aqua" aria-hidden /> Tecnología a servicio de la salud.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}