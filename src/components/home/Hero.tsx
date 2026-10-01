"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarPlus,
  FlaskConical,
  HardHat,
  House,
  FileSearch,
  Pause,
  Play,
  ScanLine,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { HERO_DURATION_MS, heroSlides } from "@/config/hero";
import { quickServices } from "@/config/site";
import { ResultadosMenu } from "@/components/ui/ResultadosMenu";

const focusLight =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const focusDark =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue";

// Ícono de la insignia sobre el titular, por slide
const badgeIconById: Record<string, LucideIcon> = {
  analisis: FlaskConical,
  domicilio: House,
  ecografo: Waves,
  rayosx: ScanLine,
};

// Ícono y color de cada píldora en "Servicios que ofrecemos"
const serviceStyleById: Record<
  string,
  { Icon: LucideIcon; text: string; bg: string; border: string; tint: string }
> = {
  analisis: { Icon: FlaskConical, text: "text-munoz-blue", bg: "bg-munoz-blue/10", border: "border-munoz-blue", tint: "bg-munoz-blue/5" },
  domicilio: { Icon: House, text: "text-munoz-green", bg: "bg-munoz-green/10", border: "border-munoz-green", tint: "bg-munoz-green/5" },
  ocupacional: { Icon: HardHat, text: "text-munoz-navy", bg: "bg-munoz-navy/10", border: "border-munoz-navy", tint: "bg-munoz-navy/5" },
  resultados: { Icon: FileSearch, text: "text-munoz-teal", bg: "bg-munoz-teal/10", border: "border-munoz-teal", tint: "bg-munoz-teal/5" },
};

// Divide el título y resalta en verde la frase indicada en "highlight"
function renderTitle(title: string, highlight?: string) {
  if (!highlight) return title;
  const idx = title.indexOf(highlight);
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="text-munoz-green">{highlight}</span>
      {title.slice(idx + highlight.length)}
    </>
  );
}

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [interacting, setInteracting] = useState(false);
  // Valor inicial calculado directamente (con inicializador perezoso), no
  // dentro de un efecto: así el efecto de abajo solo se SUSCRIBE a cambios
  // futuros (lo correcto según React), sin llamar setState de entrada.
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const running = playing && !interacting && !reduceMotion;
  const total = heroSlides.length;
  const slide = heroSlides[current];
  const BadgeIcon = badgeIconById[slide.id] ?? FlaskConical;

  const goTo = (i: number) => setCurrent(((i % total) + total) % total);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Autoplay por temporizador
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!running) return;
    timer.current = setTimeout(next, HERO_DURATION_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, running]);

  return (
    <>
      {/* Banner con margen: la foto va en un marco redondeado, no pegada a la pantalla */}
      <section aria-labelledby="hero-title" className="bg-white px-4 pb-2 pt-6 sm:px-6 lg:px-10 lg:pt-10">
        <div
          aria-roledescription="carrusel"
          aria-label="Servicios destacados"
          className="relative isolate min-h-[640px] w-full overflow-hidden rounded-[1.5rem] bg-munoz-navy shadow-2xl shadow-munoz-navy/20 sm:h-[62svh] sm:min-h-[480px] sm:rounded-[2.5rem] lg:h-[64svh]"
          onMouseEnter={() => setInteracting(true)}
          onMouseLeave={() => setInteracting(false)}
          onFocusCapture={() => setInteracting(true)}
          onBlurCapture={() => setInteracting(false)}
        >
          {/* Fotos, una detrás de otra con transición de opacidad */}
          {heroSlides.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
                i === current ? "z-0 opacity-100" : "-z-10 opacity-0"
              }`}
            >
              <Image
                src={s.image}
                alt={i === current ? s.alt : ""}
                aria-hidden={i !== current}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 90vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}

          {/* Degradados para que el texto blanco sea legible sobre cualquier foto */}
          <div className="absolute inset-0 bg-linear-to-r from-munoz-navy/95 via-munoz-navy/55 to-munoz-navy/10" />
          <div className="absolute inset-0 bg-linear-to-t from-munoz-navy/70 via-transparent to-transparent" />

          {/* Flechas de navegación manual */}
          <button
            type="button"
            onClick={prev}
            aria-label="Servicio anterior"
            className={`absolute left-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:left-6 sm:top-1/2 sm:h-11 sm:w-11 sm:-translate-y-1/2 ${focusLight}`}
          >
            <ArrowLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Siguiente servicio"
            className={`absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:right-6 sm:top-1/2 sm:h-11 sm:w-11 sm:-translate-y-1/2 ${focusLight}`}
          >
            <ArrowRight size={18} aria-hidden />
          </button>

          {/* Contenido: insignia, titular, texto y botones, hacia la esquina inferior izquierda */}
          <div className="relative z-10 flex h-full max-w-4xl flex-col justify-center px-6 pb-16 pt-8 sm:justify-end sm:px-10 sm:pb-24 sm:pt-0 lg:px-14 lg:pb-16">
            <div className="max-w-xl">
              <span
                key={slide.id + "-badge"}
                className="text-swap inline-flex items-center gap-2 rounded-full border border-munoz-green/40 bg-munoz-green/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur sm:text-sm"
              >
                <BadgeIcon size={15} aria-hidden /> {slide.label}
              </span>

              <h1
                id="hero-title"
                key={slide.id}
                className="text-swap mt-4 text-2xl font-bold leading-[1.2] tracking-tight text-white sm:mt-5 sm:text-4xl sm:leading-[1.1] lg:text-5xl"
              >
                {renderTitle(slide.title, slide.highlight)}
              </h1>
              <p
                key={slide.id + "-p"}
                style={{ animationDelay: "90ms" }}
                className="text-swap mt-4 max-w-lg text-[15px] leading-relaxed text-white/80 sm:mt-5 sm:text-lg"
              >
                {slide.text}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  key={slide.id + "-cta"}
                  href={slide.cta.href}
                  className={`rounded-full bg-munoz-green px-7 py-3.5 text-center text-base font-semibold text-white shadow-xl shadow-black/20 transition-transform hover:-translate-y-0.5 sm:text-left ${focusLight}`}
                >
                  {slide.cta.label}
                </Link>
                <Link
                  href="/servicios"
                  className={`flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:justify-start ${focusLight}`}
                >
                  <CalendarPlus size={19} aria-hidden /> Agendar
                </Link>
              </div>
            </div>
          </div>

          {/* Puntos de navegación + pausa, abajo del banner */}
          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center px-5 sm:bottom-8 lg:px-10">
            <div className="flex items-center gap-2">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ver: ${s.label}`}
                  aria-current={i === current}
                  className={`h-2 rounded-full transition-all ${focusLight} ${
                    i === current ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pausar carrusel" : "Reanudar carrusel"}
                className={`ml-3 grid h-7 w-7 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10 ${focusLight}`}
              >
                {playing ? <Pause size={12} aria-hidden /> : <Play size={12} aria-hidden />}
              </button>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {playing ? `Mostrando: ${slide.label}` : "Carrusel en pausa"}
          </p>

          {/* Franja de color al pie del banner */}
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-linear-to-r from-munoz-green via-munoz-blue to-munoz-aqua" />
        </div>
      </section>

      {/* Servicios que ofrecemos */}
      <section aria-labelledby="servicios-title" className="bg-white px-5 py-16 lg:px-10">
        <h2 id="servicios-title" className="text-center text-2xl font-bold text-munoz-navy sm:text-3xl">
          Servicios que ofrecemos
        </h2>
        <ul className="mx-auto mt-10 grid max-w-[90rem] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickServices.map((service, i) => {
            const s = serviceStyleById[service.id];
            const featured = i === 0;
            const cardClassName = `flex h-full w-full items-center gap-4 rounded-2xl border px-6 py-6 text-left transition-colors ${focusDark} ${
              featured ? `${s.border} ${s.tint}` : "border-munoz-navy/10 bg-white hover:border-munoz-navy/25"
            }`;

            // "Resultados en línea" abre el mismo desplegable del Navbar (los
            // portales reales por sede), en vez de ir a una sola página.
            if (service.id === "resultados") {
              return (
                <li key={service.id} className="h-full">
                  <ResultadosMenu align="left" wrapperClassName="h-full w-full" triggerClassName={cardClassName}>
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${s.bg}`}>
                      <s.Icon size={22} className={s.text} aria-hidden />
                    </span>
                    <span className="text-lg font-semibold text-munoz-navy">{service.label}</span>
                  </ResultadosMenu>
                </li>
              );
            }

            return (
              <li key={service.id} className="h-full">
                <Link href={service.href} className={cardClassName}>
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${s.bg}`}>
                    <s.Icon size={22} className={s.text} aria-hidden />
                  </span>
                  <span className="text-lg font-semibold text-munoz-navy">{service.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}