"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarPlus, FileText, MapPin, Phone, Search } from "lucide-react";
import { sedes, type Sede } from "@/config/sedes";
import { navActions } from "@/config/site";
import { ResultadosMenu } from "@/components/ui/ResultadosMenu";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue";

const cityFilters = ["Todas", "Arequipa", "Lima"] as const;

export function SedesExplorer() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<(typeof cityFilters)[number]>("Todas");
  const [selectedId, setSelectedId] = useState(sedes[0].id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sedes.filter((s) => {
      const matchesCity = city === "Todas" || s.city === city;
      const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q);
      return matchesCity && matchesQuery;
    });
  }, [query, city]);

  const selected: Sede = sedes.find((s) => s.id === selectedId) ?? sedes[0];
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(selected.address)}&output=embed`;

  return (
    <>
      {/* Banner: video con la tarjeta de la sede seleccionada, dentro de un marco redondeado */}
      <section className="bg-white px-4 pb-2 pt-6 sm:px-6 lg:px-10 lg:pt-10">
        <div className="relative isolate h-[42svh] min-h-[320px] w-full overflow-hidden rounded-[2rem] bg-munoz-navy shadow-2xl shadow-munoz-navy/20 sm:rounded-[2.5rem]">
          {/* TODO: reemplazar por un recorrido real de las sedes cuando esté grabado */}
          <video
            key={selected.id}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/sedes/recorrido.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-t from-munoz-navy/85 via-munoz-navy/20 to-transparent" />

          <div className="absolute bottom-6 right-6 max-w-xs rounded-2xl bg-white/10 p-4 text-right backdrop-blur-md sm:bottom-8 sm:right-8">
            <p className="text-lg font-bold text-white">{selected.name}</p>
            <p className="mt-1 flex items-start justify-end gap-1.5 text-sm text-white/75">
              <span>{selected.address}</span>
              <MapPin size={14} className="mt-0.5 shrink-0 text-munoz-aqua" aria-hidden />
            </p>
          </div>
        </div>
      </section>

      {/* Encuentra tu sede */}
      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-10">
        <h1 className="text-3xl font-bold text-munoz-navy sm:text-4xl">Encuentra tu sede</h1>
        <p className="mt-2 text-lg text-munoz-navy/65">
          Contamos con <span className="font-semibold text-munoz-blue">{sedes.length} sedes</span> en Arequipa y Lima.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Buscador, filtros y lista */}
          <div>
            <div className="flex items-center gap-2 rounded-full border border-munoz-navy/15 bg-white px-4 py-3 shadow-sm">
              <Search size={18} className="text-munoz-navy/40" aria-hidden />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por distrito o dirección"
                className="w-full bg-transparent text-sm text-munoz-navy placeholder:text-munoz-navy/40 focus:outline-none"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {cityFilters.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCity(c)}
                  aria-pressed={city === c}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${focus} ${
                    city === c
                      ? "border-munoz-blue bg-munoz-blue/10 text-munoz-blue"
                      : "border-munoz-navy/15 text-munoz-navy/65 hover:border-munoz-blue/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <ul className="mt-5 flex max-h-[520px] flex-col gap-3 overflow-y-auto pr-1">
              {filtered.map((s) => {
                const active = s.id === selectedId;
                return (
                  <li key={s.id}>
                    <div
                      className={`rounded-2xl border p-4 transition-colors ${
                        active ? "border-munoz-blue bg-munoz-blue/5" : "border-munoz-navy/10 bg-white"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedId(s.id)}
                        className={`flex w-full items-start gap-3 text-left ${focus}`}
                      >
                        <span
                          className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                            active ? "bg-munoz-blue text-white" : "bg-munoz-blue/10 text-munoz-blue"
                          }`}
                        >
                          <MapPin size={15} aria-hidden />
                        </span>
                        <span>
                          <span className="block font-semibold text-munoz-navy">{s.name}</span>
                          <span className="block text-sm text-munoz-navy/60">{s.address}</span>
                        </span>
                      </button>

                      <div className="mt-3 flex flex-wrap items-center gap-3 pl-11">
                        <a
                          href={`tel:+${s.phone}`}
                          className={`flex items-center gap-1.5 text-sm font-medium text-munoz-navy/70 hover:text-munoz-blue ${focus}`}
                        >
                          <Phone size={13} aria-hidden /> {s.phoneDisplay}
                        </a>
                        {s.phoneAlt && (
                          <a
                            href={`tel:+${s.phoneAlt}`}
                            className={`flex items-center gap-1.5 text-sm font-medium text-munoz-navy/70 hover:text-munoz-blue ${focus}`}
                          >
                            <Phone size={13} aria-hidden /> {s.phoneAltDisplay}
                          </a>
                        )}
                        <div className="ml-auto flex items-center gap-2">
                          <ResultadosMenu
                            align="right"
                            triggerClassName={`flex items-center gap-1.5 rounded-full border border-munoz-blue px-4 py-1.5 text-sm font-semibold text-munoz-blue hover:bg-munoz-blue hover:text-white ${focus}`}
                          >
                            <FileText size={14} aria-hidden /> Ver resultados
                          </ResultadosMenu>
                          <Link
                            href={navActions.agendar}
                            className={`flex items-center gap-1.5 rounded-full bg-munoz-blue px-4 py-1.5 text-sm font-semibold text-white hover:bg-munoz-navy ${focus}`}
                          >
                            <CalendarPlus size={14} aria-hidden /> Agendar cita
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <li className="rounded-2xl border border-dashed border-munoz-navy/20 p-6 text-center text-sm text-munoz-navy/50">
                  No encontramos sedes con esa búsqueda.
                </li>
              )}
            </ul>
          </div>

          {/* Mapa de la sede seleccionada */}
          <div className="h-[420px] overflow-hidden rounded-3xl border border-munoz-navy/10 shadow-sm lg:h-auto lg:min-h-[560px]">
            <iframe
              key={selected.id}
              title={`Mapa: ${selected.name}`}
              src={mapSrc}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}