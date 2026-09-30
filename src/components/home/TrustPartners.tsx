import Image from "next/image";
import { partners } from "@/config/partners";

// Cuántas veces se debe repetir la lista de partners como mínimo, para que
// la tira sea más ancha que cualquier pantalla (evita el "vacío" que se veía
// con solo 6 logos en monitores grandes, antes de que el loop se reinicie).
// Con las tarjetas más grandes, con menos repeticiones ya alcanza, así que
// se ven menos copias del mismo logo a la vez.
const MIN_ITEMS = 10;

export function TrustPartners() {
  if (partners.length === 0) return null;

  const repeatCount = Math.max(1, Math.ceil(MIN_ITEMS / partners.length));
  const base = Array.from({ length: repeatCount }, () => partners).flat();
  // Se duplica el bloque completo para que el desplazamiento sea continuo
  // (sin salto al llegar al final).
  const track = [...base, ...base];
  // Segundos por logo, para que la velocidad se sienta igual sin importar
  // cuántos partners reales haya.
  const duration = base.length * 4.5;

  return (
    <section
      aria-labelledby="respaldo-title"
      className="overflow-hidden border-t border-munoz-aqua/20 bg-munoz-mist/50 py-16"
    >
      {/* Animación de desplazamiento incrustada aquí mismo, para que no
          dependa de que se haya pegado bien en globals.css. */}
      <style>{`
        @keyframes partners-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .partners-track { animation: partners-scroll ${duration}s linear infinite; }
        .partners-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="mx-auto max-w-[90rem] px-5 text-center lg:px-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-munoz-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-munoz-blue">
          Respaldo y confianza
        </span>
        <h2 id="respaldo-title" className="mt-4 text-3xl font-bold text-munoz-navy sm:text-4xl">
          Calidad certificada que respalda cada resultado
        </h2>
      </div>

      <div className="relative mt-10">
        {/* Difuminados laterales para que el desplazamiento no se vea cortado */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-munoz-mist/50 to-transparent sm:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-munoz-mist/50 to-transparent sm:w-28"
        />

        <div aria-hidden className="partners-track flex w-max items-center gap-8 px-5">
          {track.map((p, i) => (
            <div
              key={p.id + i}
              className="relative h-32 w-64 shrink-0 rounded-2xl border border-munoz-navy/10 bg-white shadow-sm grayscale transition-all hover:grayscale-0"
            >
              <Image
                src={p.logo}
                alt={p.name}
                fill
                sizes="256px"
                className="object-contain p-6"
              />
            </div>
          ))}
        </div>
      </div>

      <p className="sr-only">
        Instituciones que respaldan la calidad de nuestros resultados: {partners.map((p) => p.name).join(", ")}.
      </p>
    </section>
  );
}