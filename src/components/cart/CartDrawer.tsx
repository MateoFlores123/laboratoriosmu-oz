"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  Check,
  ChevronLeft,
  Home,
  MapPin,
  MessageCircle,
  Trash2,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { sedes, zonasConSede, type Sede } from "@/config/sedes";
import { assistant } from "@/config/site";
import { serviceCategories, type ServiceCategorySlug } from "@/config/services";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue";

const categoryLabel: Record<ServiceCategorySlug, string> = Object.fromEntries(
  serviceCategories.map((c) => [c.slug, c.label])
) as Record<ServiceCategorySlug, string>;

type Paso = "lista" | "modalidad" | "detalle" | "finalizar" | "enviado";
type Modalidad = "sede" | "domicilio" | null;

const inputClass =
  "w-full rounded-xl border border-munoz-navy/12 bg-munoz-mist/60 px-3.5 py-2.5 text-sm text-munoz-navy placeholder:text-munoz-navy/40 transition-colors focus:border-munoz-blue focus:bg-white focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-semibold text-munoz-navy";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

const stepTitle: Record<Paso, string> = {
  lista: "Servicios seleccionados",
  modalidad: "¿Cómo quieres atenderte?",
  detalle: "Elige dónde",
  finalizar: "Tus datos y envío",
  enviado: "¡Listo!",
};

export function CartDrawer() {
  const { items, removeItem, clear, isOpen, closeCart } = useCart();

  const [paso, setPaso] = useState<Paso>("lista");
  const [modalidad, setModalidad] = useState<Modalidad>(null);

  const [zona, setZona] = useState("");
  const [elegirSedeManual, setElegirSedeManual] = useState(false);
  const [sedeId, setSedeId] = useState("");

  const [direccion, setDireccion] = useState("");
  const [distrito, setDistrito] = useState("");
  const [referencia, setReferencia] = useState("");

  const [fecha, setFecha] = useState(todayISO());
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  const sedesSugeridas = useMemo(() => (zona ? sedes.filter((s) => s.zone === zona) : []), [zona]);
  const sedeSeleccionada: Sede | undefined = sedes.find((s) => s.id === sedeId);

  function handleClose() {
    closeCart();
    // Pequeño respiro antes de resetear el paso, para que no se vea el salto
    // de contenido mientras el panel todavía está cerrando visualmente.
    setTimeout(() => setPaso(items.length > 0 ? "lista" : "lista"), 300);
  }

  function goBack() {
    if (paso === "modalidad") setPaso("lista");
    else if (paso === "detalle") setPaso("modalidad");
    else if (paso === "finalizar") setPaso("detalle");
    else if (paso === "enviado") setPaso("lista");
  }

  const faltaSede = modalidad === "sede" && !sedeSeleccionada;
  const faltaDomicilio = modalidad === "domicilio" && (!direccion.trim() || !distrito.trim());
  const detalleCompleto = modalidad === "sede" ? !faltaSede : !faltaDomicilio;

  const faltaComun = !fecha || !nombre.trim() || !telefono.trim();
  const puedeEnviar = !faltaComun;

  const fechaFormateada = fecha
    ? new Date(fecha + "T00:00:00").toLocaleDateString("es-PE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  function construirMensaje() {
    const lineas: string[] = [];
    const examenesTexto = items.map((i) => `• ${i.name}`).join("\n");
    if (modalidad === "sede" && sedeSeleccionada) {
      lineas.push("Hola, quiero agendar una cita para los siguientes análisis:", "", examenesTexto, "");
      lineas.push(`Fecha deseada: ${fechaFormateada}`);
      lineas.push(`Sede: ${sedeSeleccionada.name} — ${sedeSeleccionada.address}`);
    } else {
      lineas.push("Hola, quiero agendar una atención a domicilio para los siguientes análisis:", "", examenesTexto, "");
      lineas.push(`Fecha deseada: ${fechaFormateada}`);
      lineas.push(`Dirección: ${direccion}, ${distrito}`);
      if (referencia.trim()) lineas.push(`Referencia: ${referencia}`);
    }
    lineas.push(`Nombre: ${nombre}`);
    lineas.push(`WhatsApp: ${telefono}`);
    if (correo.trim()) lineas.push(`Correo: ${correo}`);
    lineas.push("", "Quedo atento(a) a la confirmación y al costo total.");
    return lineas.join("\n");
  }

  // El mensaje para agendar siempre va por WhatsApp (es una solicitud que
  // necesita respuesta rápida). El correo queda para más adelante, cuando
  // haya una cotización formal con precios reales que enviar por ese medio.
  function handleEnviar() {
    if (!puedeEnviar) return;
    const mensaje = construirMensaje();
    window.open(`https://wa.me/${assistant.whatsapp}?text=${encodeURIComponent(mensaje)}`, "_blank", "noopener,noreferrer");
    setPaso("enviado");
  }

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-munoz-navy/40 backdrop-blur-sm" onClick={handleClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de servicios"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Encabezado */}
        <div className="flex items-center gap-3 border-b border-munoz-navy/10 px-6 py-5">
          {paso !== "lista" && (
            <button
              type="button"
              onClick={goBack}
              aria-label="Volver"
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-munoz-navy/50 hover:bg-munoz-mist ${focus}`}
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
          )}
          <h2 className="flex-1 text-lg font-bold text-munoz-navy">{stepTitle[paso]}</h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar carrito"
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-munoz-navy/50 hover:bg-munoz-mist ${focus}`}
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        {/* Cuerpo */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {paso === "lista" &&
            (items.length === 0 ? (
              <p className="mt-10 text-center text-sm text-munoz-navy/55">
                Aún no agregaste ningún análisis. Ve a Servicios y agrega los que necesites.
              </p>
            ) : (
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-munoz-navy/10 p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-munoz-navy">{item.name}</p>
                      <span className="text-xs text-munoz-navy/45">{categoryLabel[item.category]}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Quitar ${item.name}`}
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-munoz-navy/40 hover:bg-red-50 hover:text-red-500 ${focus}`}
                    >
                      <Trash2 size={15} aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            ))}

          {paso === "modalidad" && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setModalidad("sede");
                  setPaso("detalle");
                }}
                className={`flex w-full items-start gap-3 rounded-2xl border-2 border-munoz-navy/10 p-4 text-left transition-colors hover:border-munoz-blue/40 ${focus}`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-munoz-blue/10 text-munoz-blue">
                  <Building2 size={18} aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-munoz-navy">Atención en sede</p>
                  <p className="mt-0.5 text-sm text-munoz-navy/55">Elige la sede más cercana o la que prefieras.</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalidad("domicilio");
                  setPaso("detalle");
                }}
                className={`flex w-full items-start gap-3 rounded-2xl border-2 border-munoz-navy/10 p-4 text-left transition-colors hover:border-munoz-green/40 ${focus}`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-munoz-green/10 text-munoz-green">
                  <Home size={18} aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-munoz-navy">Atención a domicilio</p>
                  <p className="mt-0.5 text-sm text-munoz-navy/55">Vamos a tomar tus muestras donde estés.</p>
                </div>
              </button>
            </div>
          )}

          {paso === "detalle" && modalidad === "sede" && (
            <div>
              <p className="text-sm text-munoz-navy/60">¿En qué zona vives? Te sugerimos la sede más cercana.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {zonasConSede.map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => {
                      setZona(z);
                      setElegirSedeManual(false);
                      setSedeId("");
                    }}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${focus} ${
                      zona === z && !elegirSedeManual
                        ? "bg-munoz-navy text-white"
                        : "bg-munoz-mist text-munoz-navy/70 hover:bg-munoz-navy/10"
                    }`}
                  >
                    {z}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setElegirSedeManual(true);
                    setZona("");
                    setSedeId("");
                  }}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${focus} ${
                    elegirSedeManual ? "bg-munoz-navy text-white" : "bg-munoz-mist text-munoz-navy/70 hover:bg-munoz-navy/10"
                  }`}
                >
                  Elegir yo la sede
                </button>
              </div>

              {(sedesSugeridas.length > 0 || elegirSedeManual) && (
                <div className="mt-4 space-y-2.5">
                  {(elegirSedeManual ? sedes : sedesSugeridas).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSedeId(s.id)}
                      className={`flex w-full items-start gap-2.5 rounded-xl border-2 p-3.5 text-left transition-colors ${focus} ${
                        sedeId === s.id ? "border-munoz-blue bg-munoz-blue/5" : "border-munoz-navy/10 hover:border-munoz-blue/30"
                      }`}
                    >
                      <MapPin size={15} className="mt-0.5 shrink-0 text-munoz-green" aria-hidden />
                      <div>
                        <p className="text-sm font-semibold text-munoz-navy">{s.name}</p>
                        <p className="text-xs text-munoz-navy/55">{s.address}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {paso === "detalle" && modalidad === "domicilio" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="direccion" className={labelClass}>Dirección</label>
                <input id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Calle, número, urbanización…" className={inputClass} />
              </div>
              <div>
                <label htmlFor="distrito" className={labelClass}>Distrito / ciudad</label>
                <input id="distrito" value={distrito} onChange={(e) => setDistrito(e.target.value)} placeholder="Ej. Cayma, Arequipa" className={inputClass} />
              </div>
              <div>
                <label htmlFor="referencia" className={labelClass}>Referencia (opcional)</label>
                <input id="referencia" value={referencia} onChange={(e) => setReferencia(e.target.value)} placeholder="Ej. frente al parque" className={inputClass} />
              </div>
            </div>
          )}

          {paso === "finalizar" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="fecha" className={labelClass}>Fecha deseada</label>
                <input id="fecha" type="date" min={todayISO()} value={fecha} onChange={(e) => setFecha(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="nombre" className={labelClass}>Nombre completo</label>
                <input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="telefono" className={labelClass}>WhatsApp</label>
                <input id="telefono" type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="+51 9xx xxx xxx" className={inputClass} />
              </div>
              <div>
                <label htmlFor="correo" className={labelClass}>Correo (opcional)</label>
                <input id="correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className={inputClass} />
              </div>

              <p className="flex items-center gap-2 rounded-xl bg-munoz-green/8 px-3.5 py-2.5 text-sm font-medium text-munoz-green">
                <MessageCircle size={15} aria-hidden />
                Tu solicitud se enviará por WhatsApp.
              </p>
            </div>
          )}

          {paso === "enviado" && (
            <div className="flex items-start gap-3 rounded-2xl border border-munoz-green/30 bg-munoz-green/5 p-5">
              <Check size={20} className="mt-0.5 shrink-0 text-munoz-green" aria-hidden />
              <div>
                <p className="font-semibold text-munoz-navy">Tu solicitud está lista.</p>
                <p className="mt-1 text-sm text-munoz-navy/60">
                  Se abrió WhatsApp con el mensaje. Si no se abrió, revisa el bloqueo de ventanas emergentes de tu
                  navegador.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Pie: total + acción */}
        {items.length > 0 && paso !== "enviado" && (
          <div className="border-t border-munoz-navy/10 px-6 py-5">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-semibold text-munoz-navy">
                {items.length} servicio{items.length !== 1 ? "s" : ""} seleccionado{items.length !== 1 ? "s" : ""}
              </span>
              {paso === "lista" && (
                <button type="button" onClick={clear} className={`inline-flex items-center gap-1 font-semibold text-munoz-navy/45 hover:text-red-500 ${focus}`}>
                  <Trash2 size={13} aria-hidden /> Vaciar
                </button>
              )}
            </div>

            {paso === "lista" && (
              <button
                type="button"
                onClick={() => setPaso("modalidad")}
                className={`w-full rounded-full bg-munoz-blue py-3 text-sm font-bold text-white shadow-md shadow-munoz-blue/25 transition-colors hover:bg-munoz-navy ${focus}`}
              >
                Continuar
              </button>
            )}

            {paso === "detalle" && (
              <button
                type="button"
                onClick={() => setPaso("finalizar")}
                disabled={!detalleCompleto}
                className={`w-full rounded-full bg-munoz-blue py-3 text-sm font-bold text-white shadow-md shadow-munoz-blue/25 transition-colors hover:bg-munoz-navy disabled:pointer-events-none disabled:opacity-40 ${focus}`}
              >
                Continuar
              </button>
            )}

            {paso === "finalizar" && (
              <button
                type="button"
                onClick={handleEnviar}
                disabled={!puedeEnviar}
                className={`w-full rounded-full bg-munoz-navy py-3 text-sm font-bold text-white shadow-md shadow-munoz-navy/25 transition-colors hover:bg-munoz-blue disabled:pointer-events-none disabled:opacity-40 ${focus}`}
              >
                Enviar solicitud
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}