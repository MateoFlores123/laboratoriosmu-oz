import { UserPlus, KeyRound, Users, FileCheck2 } from "lucide-react";
import { howItWorksSteps } from "@/config/medicos";

const icons = [UserPlus, KeyRound, Users, FileCheck2];

// Alterna degradados azul→teal y verde→teal entre los pasos
const gradientByIndex = [
  "bg-linear-to-br from-munoz-blue to-munoz-teal",
  "bg-linear-to-br from-munoz-green to-munoz-teal",
  "bg-linear-to-br from-munoz-blue to-munoz-teal",
  "bg-linear-to-br from-munoz-green to-munoz-teal",
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-16">
      {/* fondo con degradado suave azul-verde */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-munoz-mist to-white"
      />
      <div
        aria-hidden
        className="animate-float-slow pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-munoz-green/15 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-float-slow pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-munoz-blue/15 blur-3xl"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative mx-auto max-w-[90rem] px-5 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-munoz-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-munoz-green">
            Proceso simple
          </span>
          <h2 className="mt-4 text-3xl font-bold text-munoz-navy sm:text-4xl">¿Cómo funciona?</h2>
          <p className="mt-4 text-lg text-munoz-navy/60">
            Un flujo sencillo para derivar pacientes y acceder a tus beneficios.
          </p>
        </div>

        <div className="relative mt-14">
          {/* línea conectora con degradado azul → verde */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-8 hidden h-0.5 bg-linear-to-r from-munoz-blue/40 via-munoz-aqua/50 to-munoz-green/40 lg:block"
          />

          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step, i) => {
              const Icon = icons[i];
              return (
                <li
                  key={step.id}
                  className="animate-fade-up group flex flex-col items-center rounded-3xl border border-munoz-navy/8 bg-white/80 px-5 py-8 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-munoz-blue/10"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <span
                    className={`relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full text-white shadow-lg shadow-munoz-navy/20 ring-4 ring-white transition-transform duration-300 group-hover:scale-110 ${gradientByIndex[i]}`}
                  >
                    <Icon size={24} aria-hidden />
                  </span>
                  <span className="mt-5 text-xs font-bold uppercase tracking-wide text-munoz-navy/35">
                    Paso {step.id}
                  </span>
                  <span className="mt-1.5 font-semibold text-munoz-navy">{step.title}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}