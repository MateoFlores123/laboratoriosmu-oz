"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight, ChevronDown, ShoppingCart, Check, X, ArrowUp } from "lucide-react";
import { labServices, serviceCategories, type ServiceCategorySlug } from "@/config/services";
import { examDetails } from "@/config/examDetails";
import { useCart } from "@/context/CartContext";
import { InnovationsBanner } from "./InnovationsBanner";

const PAGE_SIZE = 25;

// Alterna azul y verde para las insignias de categoría, en el mismo orden
// en que aparecen en serviceCategories.
const accentBySlug: Record<ServiceCategorySlug, string> = Object.fromEntries(
  serviceCategories.map((c, i) => [
    c.slug,
    i % 2 === 0 ? "bg-munoz-blue/10 text-munoz-blue" : "bg-munoz-green/10 text-munoz-green",
  ])
) as Record<ServiceCategorySlug, string>;

const categoryLabel: Record<ServiceCategorySlug, string> = Object.fromEntries(
  serviceCategories.map((c) => [c.slug, c.label])
) as Record<ServiceCategorySlug, string>;

function normalize(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue";

// Cuántos números de página mostrar alrededor de la página actual
const PAGE_WINDOW = 1;

function buildPageList(current: number, total: number): (number | "…")[] {
  const pages = new Set<number>([1, total, current]);
  for (let i = 1; i <= PAGE_WINDOW; i++) {
    if (current - i >= 1) pages.add(current - i);
    if (current + i <= total) pages.add(current + i);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | "…")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - (sorted[i - 1] as number) > 1) result.push("…");
    result.push(p);
  });
  return result;
}

// Botón flotante para volver al inicio de la página cuando ya se
// bajó mucho revisando resultados. Aparece solo después de scrollear.
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver al inicio"
      className={`fixed bottom-6 left-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-munoz-navy text-white shadow-lg shadow-munoz-navy/25 transition-transform hover:-translate-y-0.5 hover:bg-munoz-blue ${focus} focus-visible:outline-white`}
    >
      <ArrowUp size={18} aria-hidden />
    </button>
  );
}

export function ServiciosExplorer() {
  const { addItem, removeItem, isInCart } = useCart();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ServiceCategorySlug | "todos">("todos");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return labServices.filter((s) => {
      const matchesCategory = category === "todos" || s.category === category;
      const matchesQuery = q === "" || normalize(s.name).includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  // El anuncio de química y las tarjetas de ecógrafo/rayos X solo se
  // muestran cuando no se está buscando ni filtrando nada — en cuanto el
  // usuario busca, estorban; al borrar la búsqueda y volver a "Todas las
  // categorías", reaparecen.
  const buscandoAlgo = query.trim() !== "" || category !== "todos";

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const shown = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const pageList = buildPageList(currentPage, totalPages);

  function handleCategory(slug: ServiceCategorySlug | "todos") {
    setCategory(slug);
    setPage(1);
  }

  function handleQuery(v: string) {
    setQuery(v);
    setPage(1);
  }

  function goToPage(p: number) {
    setPage(p);
    // Vuelve al inicio de TODA la sección (con encabezado y buscador
    // incluidos), no solo a la lista, para que no "desaparezca" el título.
    document.getElementById("servicios-catalogo")?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  return (
    <section id="servicios-catalogo" className="relative scroll-mt-20 overflow-hidden pb-20 pt-12">
      {/* Animación del fondo incrustada aquí mismo (no depende de que se
          haya pegado bien en globals.css). */}
      <style>{`
        @keyframes servicios-drift {
          0%   { transform: translate(-6%, 0%) scale(1); }
          50%  { transform: translate(8%, -5%) scale(1.08); }
          100% { transform: translate(-6%, 0%) scale(1); }
        }
        @keyframes servicios-drift-reverse {
          0%   { transform: translate(6%, 0%) scale(1.05); }
          50%  { transform: translate(-8%, 4%) scale(1); }
          100% { transform: translate(6%, 0%) scale(1.05); }
        }
        .servicios-drift { animation: servicios-drift 16s ease-in-out infinite; }
        .servicios-drift-reverse { animation: servicios-drift-reverse 20s ease-in-out infinite; }
      `}</style>

      {/* fondo: difuminado celeste y verde claro, sin líneas ni formas marcadas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-munoz-blue/10 via-white to-munoz-green/8"
      />
      <div
        aria-hidden
        className="servicios-drift pointer-events-none absolute -right-1/4 -top-1/3 h-[140%] w-[75%] rounded-full bg-munoz-aqua/15 blur-[110px]"
      />
      <div
        aria-hidden
        className="servicios-drift-reverse pointer-events-none absolute -left-1/4 bottom-[-30%] h-[110%] w-[65%] rounded-full bg-munoz-green/10 blur-[110px]"
        style={{ animationDelay: "2.5s" }}
      />

      <BackToTop />

      {/* Encabezado */}
      <div className="relative mx-auto max-w-[70rem] px-5 text-center lg:px-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-munoz-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-munoz-blue">
          Catálogo de servicios
        </span>
        <h1 className="mt-4 text-4xl font-extrabold text-munoz-navy sm:text-5xl">
          Servicios pensados para <span className="text-munoz-green">cuidarte</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-munoz-navy/60">
          Más de 490 análisis, perfiles y vacunas disponibles en nuestras sedes.
        </p>
      </div>

      {/* Buscador + filtros: va ANTES del anuncio de química/equipos nuevos
          (para que no se pierda apenas se entra a la página) y sticky,
          debajo del navbar (que mide 5rem / top-20), para que siga a la
          vista al bajar entre las novedades y la lista de +490 análisis. */}
      <div className="sticky top-20 z-30 mx-auto mt-10 max-w-[70rem] px-5 lg:px-10">
        <div className="animate-fade-up rounded-2xl border border-munoz-navy/10 bg-white/95 p-3 shadow-md backdrop-blur-sm">
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-munoz-navy/35"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => handleQuery(e.target.value)}
              placeholder="Busca tu análisis, perfil o vacuna…"
              aria-label="Buscar servicio"
              className={`w-full rounded-xl border border-transparent bg-munoz-mist/70 py-3 pl-11 pr-11 text-sm text-munoz-navy placeholder:text-munoz-navy/40 transition-colors focus:border-munoz-blue focus:bg-white focus:outline-none ${focus}`}
            />
            {query && (
              <button
                type="button"
                onClick={() => handleQuery("")}
                aria-label="Limpiar búsqueda"
                className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-munoz-navy/40 hover:text-munoz-navy ${focus}`}
              >
                <X size={16} aria-hidden />
              </button>
            )}
          </div>

          {/* Filtro de categoría: un solo desplegable, para no abrumar con
              tantas opciones (18 categorías) */}
          <div className="relative mt-3">
            <label htmlFor="categoria-servicio" className="sr-only">
              Filtrar por categoría
            </label>
            <select
              id="categoria-servicio"
              value={category}
              onChange={(e) => handleCategory(e.target.value as ServiceCategorySlug | "todos")}
              className={`w-full appearance-none rounded-xl border border-munoz-navy/12 bg-munoz-mist/70 py-3 pl-4 pr-10 text-sm font-semibold text-munoz-navy transition-colors focus:border-munoz-blue focus:bg-white focus:outline-none ${focus}`}
            >
              <option value="todos">Todas las categorías</option>
              {serviceCategories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-munoz-navy/40"
            />
          </div>
        </div>
      </div>

      {/* Anuncio de química e inmunobioquímica + equipos nuevos (ecógrafo y
          rayos X con IA), debajo del buscador — se ocultan en cuanto hay una
          búsqueda o filtro activo, para no estorbar en los resultados. */}
      {!buscandoAlgo && (
        <div className="animate-fade-up mt-10">
          <InnovationsBanner />
        </div>
      )}

      {/* Resultados + lista (ya NO sticky, solo el buscador de arriba) */}
      <div className="relative mx-auto mt-6 max-w-[70rem] px-5 lg:px-10">
        <p id="resultados-servicios" className="scroll-mt-24 text-sm font-semibold text-munoz-navy/50">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} encontrado
          {filtered.length !== 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-munoz-navy/15 bg-white/60 p-10 text-center">
            <p className="font-semibold text-munoz-navy">No encontramos resultados</p>
            <p className="mt-1 text-sm text-munoz-navy/55">
              Prueba con otro nombre o comunícate con nosotros para confirmar disponibilidad.
            </p>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {shown.map((s, i) => {
              const inCart = isInCart(s.id);
              return (
                <li
                  key={s.id}
                  className="animate-fade-up flex flex-col gap-3 rounded-2xl border border-munoz-navy/8 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                  style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
                >
                  <div>
                    <p className="font-semibold text-munoz-navy">{s.name}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${accentBySlug[s.category]}`}>
                        {categoryLabel[s.category]}
                      </span>
                      <Link
                        href={`/servicios/${s.id}`}
                        className={`text-xs font-semibold text-munoz-navy/45 underline-offset-2 hover:text-munoz-blue hover:underline ${focus}`}
                      >
                        Ver más{examDetails[s.id] ? "" : " (info próximamente)"}
                      </Link>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => (inCart ? removeItem(s.id) : addItem(s))}
                    aria-pressed={inCart}
                    className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border-2 px-5 py-2 text-sm font-semibold transition-colors ${focus} ${
                      inCart
                        ? "border-munoz-green bg-munoz-green text-white hover:bg-munoz-green/90"
                        : "border-munoz-blue text-munoz-blue hover:bg-munoz-blue hover:text-white"
                    }`}
                  >
                    {inCart ? (
                      <>
                        <Check size={15} aria-hidden />
                        En el carrito
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={15} aria-hidden />
                        Agregar
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {totalPages > 1 && (
          <nav aria-label="Paginación de resultados" className="mt-8 flex items-center justify-center gap-1.5">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Página anterior"
              className={`grid h-9 w-9 place-items-center rounded-full border border-munoz-navy/15 bg-white text-munoz-navy transition-colors hover:bg-munoz-mist disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white ${focus}`}
            >
              <ChevronLeft size={16} aria-hidden />
            </button>

            {pageList.map((p, i) =>
              p === "…" ? (
                <span key={`ellipsis-${i}`} className="px-1.5 text-sm text-munoz-navy/40">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => goToPage(p)}
                  aria-current={p === currentPage ? "page" : undefined}
                  className={`grid h-9 w-9 place-items-center rounded-full text-sm font-semibold transition-colors ${focus} ${
                    p === currentPage
                      ? "bg-munoz-navy text-white"
                      : "bg-white text-munoz-navy/70 hover:bg-munoz-mist"
                  }`}
                >
                  {p}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Página siguiente"
              className={`grid h-9 w-9 place-items-center rounded-full border border-munoz-navy/15 bg-white text-munoz-navy transition-colors hover:bg-munoz-mist disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white ${focus}`}
            >
              <ChevronRight size={16} aria-hidden />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}