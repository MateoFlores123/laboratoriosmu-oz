import Image from "next/image";
import { ArrowRight, CalendarCheck, Phone } from "lucide-react";
import { locations } from "@/config/site";
import { MedicosWaves } from "./MedicosWaves";

export function MedicosHero() {
  return (
    <section className="mx-auto max-w-[90rem] px-5 pt-6 lg:px-10">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-munoz-mist via-white to-munoz-aqua/25 px-6 py-14 shadow-sm sm:px-12 sm:py-16 lg:px-16">
        {/* ondas de fondo, celestes y verdes */}
        <MedicosWaves />

        {/* glow blobs flotantes */}
        <div
          aria-hidden
          className="animate-float-slow pointer-events-none absolute -right-16 -top-20 h-80 w-80 rounded-full bg-munoz-aqua/30 blur-3xl"
        />
        <div
          aria-hidden
          className="animate-float-slow pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-munoz-green/15 blur-3xl"
          style={{ animationDelay: "2.5s" }}
        />

        <div className="relative grid items-stretch gap-12 lg:grid-cols-[0.95fr_1.25fr]">
          <div className="animate-fade-up flex flex-col justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-munoz-navy/5 px-4 py-1.5 text-sm font-semibold text-munoz-navy ring-1 ring-munoz-navy/10">
              Programa de médicos aliados
            </span>
            <h1 className="mt-5 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-munoz-navy sm:text-5xl lg:text-6xl">
              Tecnología avanzada,
              <br />
              <span className="text-munoz-blue">cuidado preciso</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-munoz-navy/60">
              Súmate como <strong className="font-semibold text-munoz-navy">médico aliado</strong> y
              accede a un canal exclusivo, resultados rápidos y un portal digital para
              acompañar a tus pacientes.
            </p>
            <a
              href="#registro"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-munoz-navy px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-munoz-navy/25 transition-transform hover:-translate-y-0.5 hover:bg-munoz-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue"
            >
              ¡Regístrate ahora!
              <ArrowRight size={16} aria-hidden />
            </a>
          </div>

          <div
            className="animate-fade-up relative min-h-[340px] overflow-hidden rounded-[2rem] shadow-2xl shadow-munoz-navy/20 ring-4 ring-white sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[460px]"
            style={{ animationDelay: "150ms" }}
          >
            {/* TODO: reemplazar por una foto real de un médico o del equipo */}
            <Image
              src="/medicos/hero.jpg"
              alt="Médico aliado de Laboratorios Muñoz"
              fill
              sizes="(min-width: 1024px) 55vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-munoz-navy/25 via-transparent to-transparent" />

            {/* insignia flotante: agendar */}
            <a
              href="/servicios"
              className="absolute bottom-5 left-5 right-5 flex items-center justify-center gap-2 rounded-full bg-munoz-blue/95 px-5 py-3 text-sm font-bold text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-munoz-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:hidden"
            >
              <CalendarCheck size={16} aria-hidden /> ¡Agenda tu cita!
            </a>
          </div>
        </div>

        {/* franja inferior con contacto, estilo insignia */}
        <div className="relative mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-munoz-navy/10 pt-6">
          <a
            href="/servicios"
            className="hidden items-center gap-2 rounded-full bg-munoz-blue px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-munoz-blue/25 transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            <CalendarCheck size={16} aria-hidden /> ¡Agenda tu cita!
          </a>
          <a
            href={`tel:+51${locations.arequipa.phone}`}
            className="inline-flex items-center gap-2 text-lg font-bold text-munoz-navy hover:text-munoz-blue"
          >
            <Phone size={18} className="text-munoz-green" aria-hidden />
            {locations.arequipa.phoneDisplay}
          </a>
          <p className="text-sm font-medium italic text-munoz-navy/50">
            Tu salud, nuestra mejor imagen.
          </p>
        </div>
      </div>
    </section>
  );
}