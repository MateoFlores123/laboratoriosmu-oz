import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ScanLine, Sparkles, Waves, type LucideIcon } from "lucide-react";
import { innovations } from "@/config/innovations";
import { labServices } from "@/config/services";
import { sedeExclusivaTexto } from "@/lib/sedeDisponibilidad";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// Ícono distintivo por equipo, en la insignia flotante
const iconById: Record<string, LucideIcon> = {
  ecografo: Waves,
  rayosx: ScanLine,
};

// Colores de las partículas, alternando los tonos de marca
const particleColors = [
  "var(--color-munoz-blue)",
  "var(--color-munoz-green)",
  "var(--color-munoz-aqua)",
];

// Genera partículas "tecnológicas" flotando de un lado a otro. Se calcula
// en el servidor en cada carga de la página (no necesita JS en el cliente).
function buildParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 3 + Math.random() * 7,
    color: particleColors[i % particleColors.length],
    duration: 10 + Math.random() * 14,
    delay: -Math.random() * 18,
    drift: 40 + Math.random() * 90, // cuánto se desplaza de lado a lado (px)
    variant: i % 2 === 0 ? "a" : "b",
  }));
}

// El inicio solo destaca los dos EQUIPOS nuevos (ecógrafo y rayos X); la
// química e inmunobioquímica se promociona en /servicios (no es un equipo
// "visible" como estos dos). Ver nota en src/config/innovations.ts.
const idsEnInicio = ["ecografo", "rayosx"];

export function Innovations() {
  const particles = buildParticles(26);
  const itemsInicio = innovations.filter((i) => idsEnInicio.includes(i.id));

  return (
    <section
      aria-labelledby="innovaciones-title"
      className="relative isolate overflow-hidden px-5 py-20 lg:px-10"
    >
      {/* Fondo: degradado suave + partículas tecnológicas desplazándose de
          lado a lado (sin imagen, todo generado con CSS). */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-linear-to-br from-munoz-mist via-white to-munoz-aqua/15">
        <style>{`
          @keyframes innov-drift-a {
            0%, 100% { transform: translate(0, 0); opacity: var(--p-op, 0.45); }
            50% { transform: translate(var(--p-drift), -18px); opacity: calc(var(--p-op, 0.45) * 0.6); }
          }
          @keyframes innov-drift-b {
            0%, 100% { transform: translate(0, 0); opacity: var(--p-op, 0.45); }
            50% { transform: translate(calc(var(--p-drift) * -1), 16px); opacity: calc(var(--p-op, 0.45) * 0.6); }
          }
        `}</style>
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full shadow-[0_0_10px_currentColor]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              color: p.color,
              opacity: 0.45,
              // @ts-expect-error variables CSS personalizadas
              "--p-drift": `${p.drift}px`,
              "--p-op": 0.45,
              animation: `innov-drift-${p.variant} ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[90rem]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-munoz-green shadow-sm backdrop-blur">
            <Sparkles size={13} aria-hidden /> Nuevas innovaciones
          </span>
          <h2 id="innovaciones-title" className="mt-4 text-3xl font-bold text-munoz-navy sm:text-4xl">
            Tecnología nueva, al servicio de tu diagnóstico
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-munoz-navy/60">
            Incorporamos equipos con inteligencia artificial para diagnósticos más rápidos y precisos.
          </p>
        </div>

        {/* Tarjetas "editoriales": la foto ocupa toda la tarjeta, con el
            contenido flotando encima sobre un degradado oscuro, estilo
            portada de revista/producto premium. */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {itemsInicio.map((item) => {
            const Icon = iconById[item.id] ?? Sparkles;
            const service = labServices.find((s) => s.id === item.serviceId);
            const notaSede = service ? sedeExclusivaTexto(service) : null;
            return (
              <Link
                key={item.id}
                href={`/servicios/${item.serviceId}`}
                className={`group relative isolate flex h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] shadow-2xl shadow-munoz-navy/25 transition-transform duration-300 hover:-translate-y-1.5 sm:h-[30rem] ${focus}`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Degradado MUCHO más suave (solo para que el texto se lea),
                    la foto ya no se ve oscurecida por un velo encima. */}
                <div className="absolute inset-0 bg-linear-to-t from-munoz-navy/80 via-munoz-navy/25 to-transparent" />
                {/* Acento de color en la esquina, como el resto de la marca */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-munoz-aqua/30 blur-3xl"
                />

                <span className="absolute left-7 top-7 z-20 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white ring-1 ring-white/30 backdrop-blur-md">
                  <Sparkles size={12} aria-hidden /> Nuevo
                </span>

                <div className="relative z-10 flex flex-col gap-3 p-8 sm:p-10">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md">
                    <Icon size={22} aria-hidden />
                  </span>
                  <h3 className="text-2xl font-bold text-white [text-shadow:0_2px_10px_rgba(15,59,102,0.6)] sm:text-3xl">{item.title}</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-white/90 [text-shadow:0_1px_6px_rgba(15,59,102,0.55)] sm:text-base">
                    {item.description}
                  </p>
                  {notaSede && (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-md">
                      <MapPin size={12} aria-hidden /> {notaSede}
                    </span>
                  )}
                  <span className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-munoz-navy shadow-lg transition-transform duration-300 group-hover:translate-x-1">
                    Ver más información
                    <ArrowRight size={16} aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}