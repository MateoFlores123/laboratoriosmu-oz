"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, X } from "lucide-react";
import { assistant } from "@/config/site";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue";

export function AsistenteFlotante() {
  const [showBubble, setShowBubble] = useState(false);
  const [index, setIndex] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  // Al llegar al footer, el personaje (fijo en la pantalla) empezaría a
  // taparlo, así que se encoge y desaparece justo antes de que eso pase, y
  // vuelve a aparecer si el usuario sube de nuevo.
  const [cercaDelFooter, setCercaDelFooter] = useState(false);
  const whatsappUrl = "https://wa.me/" + assistant.whatsapp;

  // El globo aparece a los 3 s y rota el mensaje cada 6 s
  useEffect(() => {
    const show = setTimeout(() => setShowBubble(true), 3000);
    const rotate = setInterval(
      () => setIndex((i) => (i + 1) % assistant.messages.length),
      6000
    );
    return () => {
      clearTimeout(show);
      clearInterval(rotate);
    };
  }, []);

  // Observa el footer (está en todas las páginas, ver layout.tsx): en
  // cuanto empieza a entrar en pantalla, se activa la animación de encogido.
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setCercaDelFooter(entry.isIntersecting),
      // Se adelanta ~120px antes de que el footer sea visible del todo,
      // para que el encogido termine justo a tiempo.
      { threshold: 0, rootMargin: "0px 0px -120px 0px" }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Sin fondo: solo el personaje. Con fondo: círculo con borde de marca.
  // Un poco más chico que antes (h-64/h-88 era demasiado grande y estorbaba
  // el carrusel/los botones del Hero).
  const characterStyle = assistant.transparent
    ? "h-48 sm:h-64"
    : "h- w-56 sm:h-72 sm:w-72 overflow-hidden rounded-full border-4 border-white bg-munoz-mist shadow-xl ring-2 ring-munoz-aqua";

  return (
    // Pegado a la esquina inferior derecha. El video transparente suele
    // traer un margen vacío (transparente) a los costados del personaje
    // dentro del propio cuadro, así que aunque el contenedor esté en
    // right-0 queda un "hueco" antes del borde real de la pantalla; el
    // translate-x lo compensa empujando al personaje más hacia la esquina.
    <div
      className={`fixed bottom-0 right-0 z-40 flex flex-col items-center transition-all duration-300 ease-in ${
        assistant.transparent ? "translate-x-6 sm:translate-x-10" : ""
      } ${
        cercaDelFooter
          ? "pointer-events-none origin-bottom-right scale-0 opacity-0"
          : "scale-100 opacity-100"
      }`}
    >
      {/* Globos: centrados sobre la cabeza. Ajusta el "-mb-*" para acercarlos o alejarlos */}
      <div className="-mb- flex flex-col items-center gap-2 sm:-mb--1">
        {panelOpen && !cercaDelFooter && (
          <div
            role="dialog"
            aria-label="Asistente del laboratorio"
            className="bubble-in w-72 rounded-2xl border border-munoz-aqua/50 bg-white p-4 shadow-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-munoz-navy">¿En qué te ayudamos?</p>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label="Cerrar asistente"
                className={`rounded-full p-1 text-munoz-navy/60 hover:bg-munoz-mist ${focus}`}
              >
                <X size={18} aria-hidden />
              </button>
            </div>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {assistant.quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setPanelOpen(false)}
                    className="block rounded-lg bg-munoz-mist px-3 py-2 font-medium text-munoz-navy hover:bg-munoz-aqua/30"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              {/* TODO(backend): reemplazar por chat propio cuando exista */}
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-munoz-green px-3 py-2 font-semibold text-white hover:opacity-90"
                >
                  <MessageCircle size={16} aria-hidden /> Escribir por WhatsApp
                </a>
              </li>
            </ul>
          </div>
        )}

        {showBubble && !panelOpen && !cercaDelFooter && (
          <div className="relative max-w-[240px] rounded-2xl bg-white py-2.5 pl-4 pr-8 text-sm font-medium text-munoz-navy shadow-lg ring-1 ring-munoz-aqua/50">
            <p key={index} className="bubble-in">
              {assistant.messages[index]}
            </p>
            <button
              type="button"
              onClick={() => setShowBubble(false)}
              aria-label="Ocultar mensaje"
              className={`absolute right-1.5 top-1.5 rounded-full p-1 text-munoz-navy/50 hover:bg-munoz-mist ${focus}`}
            >
              <X size={14} aria-hidden />
            </button>
            {/* Colita apuntando a la cabeza */}
            <span
              aria-hidden
              className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white"
            />
          </div>
        )}
      </div>

      {/* Personaje */}
      <button
        type="button"
        onClick={() => setPanelOpen((v) => !v)}
        aria-expanded={panelOpen}
        aria-label="Abrir asistente: preguntas sobre tus exámenes"
        className={`block ${characterStyle} ${focus}`}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={
            assistant.transparent
              ? "block h-full w-auto"
              : "block h-full w-full object-cover"
          }
        >
          {assistant.webm && <source src={assistant.webm} type="video/webm" />}
          <source src={assistant.mp4} type="video/mp4" />
        </video>
      </button>
    </div>
  );
}