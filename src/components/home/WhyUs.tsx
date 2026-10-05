import Image from "next/image";
import { BadgeCheck, CalendarClock, ShieldCheck, Timer, type LucideIcon } from "lucide-react";
import { differentiators } from "@/config/about";

const iconById: Record<string, LucideIcon> = {
  confiables: BadgeCheck,
  puntualidad: Timer,
  horario: CalendarClock,
  bioseguridad: ShieldCheck,
};

// Alterna azul y verde entre los 4 puntos, para que el verde tenga presencia real
const accentByIndex = [
  { bg: "bg-munoz-blue/10", text: "text-munoz-blue" },
  { bg: "bg-munoz-green/10", text: "text-munoz-green" },
  { bg: "bg-munoz-blue/10", text: "text-munoz-blue" },
  { bg: "bg-munoz-green/10", text: "text-munoz-green" },
];

export function WhyUs() {
  return (
    <section aria-labelledby="nosotros-title" className="relative overflow-hidden bg-white px-5 py-16 lg:px-10">
      {/* Resplandor verde, sutil, detrás de la imagen */}
      <div aria-hidden className="pointer-events-none absolute -right-16 top-1/4 h-80 w-80 rounded-full bg-munoz-green/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-[90rem] items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Texto, a la izquierda */}
        <div>
          <h2 id="nosotros-title" className="text-3xl font-bold text-munoz-navy sm:text-4xl">
            Lo que nos diferencia
          </h2>
          <span aria-hidden className="mt-3 block h-1.5 w-14 rounded-full bg-munoz-green" />
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-munoz-navy/65">
            30 años cuidando la salud de Arequipa y Lima nos enseñaron que la confianza se construye
            en cada detalle del proceso.
          </p>

          <ul className="mt-10 space-y-7">
            {differentiators.map((item, i) => {
              const Icon = iconById[item.id];
              const accent = accentByIndex[i];
              return (
                <li key={item.id} className="flex gap-4">
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${accent.bg}`}>
                    <Icon size={20} className={accent.text} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-munoz-navy">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-munoz-navy/60">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Imagen, a la derecha */}
        <div className="relative mx-auto aspect-[4/3] w-full max-w-xl lg:max-w-none">
          <div
            aria-hidden
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.5rem] border-2 border-munoz-green/50"
          />
          <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-xl shadow-munoz-navy/10">
            {/* TODO: reemplazar por una foto real del equipo o una sede */}
            <Image
              src="/nosotros/equipo2.jpg"
              alt="Personal de Laboratorios Muñoz atendiendo a un paciente"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}   