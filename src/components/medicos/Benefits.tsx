import { Star, Gauge, FileText, LayoutDashboard } from "lucide-react";
import { doctorBenefits } from "@/config/medicos";
import { CircuitBackground } from "./CircuitBackground";

const iconById = {
  atencion: Star,
  resultados: Gauge,
  informes: FileText,
  portal: LayoutDashboard,
} as const;

// Alterna azul y verde entre las tarjetas
const accentById: Record<string, { bg: string; text: string }> = {
  atencion: { bg: "bg-munoz-blue/10", text: "text-munoz-blue" },
  resultados: { bg: "bg-munoz-green/10", text: "text-munoz-green" },
  informes: { bg: "bg-munoz-blue/10", text: "text-munoz-blue" },
  portal: { bg: "bg-munoz-green/10", text: "text-munoz-green" },
};

export function Benefits() {
  return (
    <section className="relative overflow-hidden bg-munoz-mist py-16">
      <CircuitBackground className="text-munoz-navy/[0.04]" />
      {/* glow blobs de fondo */}
      <div aria-hidden className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-munoz-blue/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-munoz-green/10 blur-3xl" />

      <div className="relative mx-auto max-w-[90rem] px-5 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-munoz-navy sm:text-4xl">Beneficios para médicos</h2>
          <span aria-hidden className="mx-auto mt-2 block h-1 w-14 rounded-full bg-munoz-green" />
          <p className="mt-4 text-lg text-munoz-navy/65">Ventajas reales para ti y tus pacientes.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {doctorBenefits.map((b, i) => {
            const Icon = iconById[b.id as keyof typeof iconById];
            const accent = accentById[b.id];
            return (
              <div
                key={b.id}
                className="animate-fade-up group flex gap-4 rounded-2xl border border-munoz-navy/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-munoz-blue/10"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${accent.bg} ${accent.text}`}
                >
                  <Icon size={22} aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold text-munoz-navy">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-munoz-navy/60">{b.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}