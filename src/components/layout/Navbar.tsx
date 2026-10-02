"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CalendarPlus, FileText, Menu, ShoppingCart, X } from "lucide-react";
import { brand, navLinks } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { ResultadosMenu } from "@/components/ui/ResultadosMenu";
import { HeaderWave } from "./HeaderWave";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue";

export function Navbar() {
  const pathname = usePathname();
  // "Cotizar" ahora refleja el carrito real de análisis seleccionados
  // (antes usaba quoteCount, un mock que siempre daba 0).
  const { items, openCart } = useCart();
  const quoteCount = items.length;
  const [open, setOpen] = useState(false);

  // Cierra el menú móvil al navegar, SIN useEffect: siguiendo la guía de React
  // ("Adjusting state when a prop changes"), se ajusta el estado durante el
  // render comparando con el pathname anterior, en vez de sincronizarlo
  // después con un efecto (lo que generaba el warning de "cascading renders").
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-munoz-mist/95 backdrop-blur">
      <nav aria-label="Principal" className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <Link href="/" aria-label={`${brand.name}, ir al inicio`} className={`shrink-0 rounded ${focus}`}>
          <Image src={brand.logo} alt={brand.name} width={150} height={56} priority className="h-12 w-auto" />
        </Link>

        {/* Enlaces (desktop) */}
        <ul className="hidden items-center gap-10 lg:flex">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`relative py-2 text-[15px] font-medium transition-colors ${focus} ${
                  isActive(href)
                    ? "text-munoz-blue after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-munoz-blue"
                    : "text-munoz-navy hover:text-munoz-blue"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Acciones (desktop) */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/servicios" className={`flex items-center gap-2 rounded-full px-3 py-2 text-[15px] font-semibold text-munoz-blue hover:bg-white ${focus}`}>
            <CalendarPlus size={20} aria-hidden /> Agendar
          </Link>
          <button
            type="button"
            onClick={openCart}
            className={`relative flex items-center gap-2 rounded-full border border-munoz-blue px-5 py-2 text-[15px] font-semibold text-munoz-blue hover:bg-munoz-blue hover:text-white ${focus}`}
          >
            <ShoppingCart size={18} aria-hidden /> Cotizar
            {quoteCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-munoz-green px-1 text-xs text-white">
                <span className="sr-only">Análisis en tu carrito: </span>{quoteCount}
              </span>
            )}
          </button>

          {/* Resultados por sede: desplegable con los portales externos */}
          <div className="relative z-10">
            <ResultadosMenu
              align="right"
              triggerClassName={`flex h-10 items-center gap-2 rounded-full bg-munoz-blue pl-4 pr-3.5 text-[15px] font-semibold text-white hover:bg-munoz-navy ${focus}`}
            >
              <FileText size={17} aria-hidden />
              Resultados
            </ResultadosMenu>
          </div>
        </div>

        {/* Cotizar + Resultados + hamburguesa (móvil): antes estos dos solo
            vivían dentro del menú desplegable y había que abrirlo para
            llegar a ellos; ahora quedan a la vista junto al botón de menú. */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Cotizar${quoteCount > 0 ? `, ${quoteCount} análisis en el carrito` : ""}`}
            className={`relative grid h-11 w-11 place-items-center rounded-full text-munoz-navy hover:bg-white ${focus}`}
          >
            <ShoppingCart size={22} aria-hidden />
            {quoteCount > 0 && (
              <span className="absolute right-1 top-1 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-munoz-green px-1 text-[10px] font-bold text-white">
                {quoteCount}
              </span>
            )}
          </button>

          <ResultadosMenu
            align="right"
            triggerClassName={`grid h-11 w-11 place-items-center rounded-full text-munoz-navy hover:bg-white ${focus}`}
          >
            <FileText size={21} aria-hidden />
            <span className="sr-only">Resultados en línea</span>
          </ResultadosMenu>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={`grid h-11 w-11 place-items-center rounded-full text-munoz-navy ${focus}`}
          >
            {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {open && (
        <div id="menu-movil" className="border-t border-munoz-aqua/40 bg-munoz-mist px-5 pb-6 pt-3 lg:hidden">
          <ul className="flex flex-col">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} aria-current={isActive(href) ? "page" : undefined}
                  className={`block py-3 text-lg font-medium ${isActive(href) ? "text-munoz-blue" : "text-munoz-navy"} ${focus}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Cotizar y Resultados ya están siempre visibles junto al botón
              de menú (arriba), así que aquí solo queda Agendar. */}
          <Link
            href="/servicios"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-munoz-blue py-3 font-semibold text-white"
          >
            <CalendarPlus size={18} aria-hidden /> Agendar
          </Link>
        </div>
      )}

      <HeaderWave />
    </header>
  );
}