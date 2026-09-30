import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { frequentTests } from "@/config/tests";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue";

export function FrequentTests() {
  return (
    <section
      aria-labelledby="frequent-tests-title"
      className="relative isolate overflow-hidden border-t border-munoz-aqua/25 bg-linear-to-b from-white via-munoz-mist/60 to-white px-5 py-16 lg:px-10"
    >
      {/* Ondas de fondo, celestes con toques verdes (decorativo) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70"
      >
        <path d="M0 90 C 260 40, 480 140, 760 85 S 1220 30, 1440 95" fill="none" stroke="var(--color-munoz-aqua)" strokeWidth="2" strokeOpacity="0.5" />
        <path d="M0 130 C 280 70, 500 180, 780 120 S 1240 60, 1440 130" fill="none" stroke="var(--color-munoz-aqua)" strokeWidth="2" strokeOpacity="0.35" />
        <path d="M0 420 C 260 470, 500 370, 780 430 S 1220 480, 1440 415" fill="none" stroke="var(--color-munoz-green)" strokeWidth="2" strokeOpacity="0.3" />
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-munoz-aqua/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-20 -z-10 h-72 w-72 rounded-full bg-munoz-green/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-[90rem]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="frequent-tests-title" className="text-3xl font-bold text-munoz-navy sm:text-4xl">
            Análisis clínicos más frecuentes
          </h2>
          <Link
            href="/servicios#analisis-clinicos"
            className={`group flex items-center gap-1 text-base font-semibold text-munoz-blue hover:text-munoz-navy ${focus}`}
          >
            Ver todos los análisis clínicos
            <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {frequentTests.map((test) => (
            <li key={test.id} className="h-full">
              <Link
                href={`/servicios/${test.id}`}
                className={`group flex h-full items-center justify-between gap-3 rounded-2xl border border-munoz-aqua/40 bg-white/80 px-6 py-5 text-lg shadow-sm backdrop-blur transition-colors hover:border-munoz-blue hover:bg-white ${focus}`}
              >
                <span className="font-medium text-munoz-navy">{test.name}</span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-munoz-mist text-munoz-blue transition-colors group-hover:bg-munoz-green group-hover:text-white">
                  <ChevronRight size={17} aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}