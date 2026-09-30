"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Building2,
  Check,
  ChevronRight,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { sedes, zonasConSede, type Sede } from "@/config/sedes";
import { assistant, quickServices } from "@/config/site";
import { serviceCategories, type ServiceCategorySlug } from "@/config/services";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue";

const categoryLabel: Record<ServiceCategorySlug, string> = Object.fromEntries(
  serviceCategories.map((c) => [c.slug, c.label])
) as Record<ServiceCategorySlug, string>;

type Modalidad = "sede" | "domicilio" | null;

const inputClass =
  "w-full rounded-xl border border-munoz-navy/12 bg-munoz-mist/60 px-4 py-2.5 text-sm text-munoz-navy placeholder:text-munoz-navy/40 transition-colors focus:border-munoz-blue focus:bg-white focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-semibold text-munoz-navy";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function CarritoView() {
  const { items, removeItem, clear } = useCart();

  const [modalidad, setModalidad] = useState<Modalidad>(null);

  // Atención en sede
  const [zona, setZona] = useState<string>("");
  const [elegirSedeManual, setElegirSedeManual] = useState(false);
  const [sedeId, setSedeId] = useState<string>("");

  // Atención a domicilio
  const [direccion, setDireccion] = useState("");
  const [distrito, setDistrito] = useState("");
  const [referencia, setReferencia] = useState("");

  // Datos comunes
  const [fecha, setFecha] = useState(todayISO());
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  // Canales de envío
  const [porWhatsapp, setPorWhatsapp] = useState(true);
  const [porCorreo, setPorCorreo] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const sedesSugeridas = useMemo(
    () => (zona ? sedes.filter((s) => s.zone === zona) : []),
    [zona]
  );
  const sedeSeleccionada: Sede | undefined = sedes.find((s) => s.id === sedeId);

  const examenesTexto = items.map((i) => `• ${i.name}`).join("\n");

  const fechaFormateada = fecha
    ? new Date(fecha + "T00:00:00").toLocaleDateString("es-PE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const faltaSede = modalidad === "sede" && !sedeSeleccionada;
  const faltaDomicilio = modalidad === "domicilio" && (!direccion.trim() || !distrito.trim());
  const faltaComun = !fecha || !nombre.trim() || !telefono.trim();
  const faltaCanal = !porWhatsapp && !porCorreo;
  const puedeEnviar =
    items.length > 0 && !!modalidad && !faltaSede && !faltaDomicilio && !faltaComun && !faltaCanal;

  function construirMensaje() {
    const lineas: string[] = [];
    if (modalidad === "sede" && sedeSeleccionada) {
      lineas.push(`Hola, quiero agendar una cita para los siguientes análisis:`);
      lineas.push("");
      lineas.push(examenesTexto);
      lineas.push("");
      lineas.push(`Fecha deseada: ${fechaFormateada}`);
      lineas.push(`Sede: ${sedeSeleccionada.name} — ${sedeSeleccionada.address}`);
    } else {
      lineas.push(`Hola, quiero agendar una atención a domicilio para los siguientes análisis:`);
      lineas.push("");
      lineas.push(examenesTexto);
      lineas.push("");
      lineas.push(`Fecha deseada: ${fechaFormateada}`);
      lineas.push(`Dirección: ${direccion}, ${distrito}`);
      if (referencia.trim()) lineas.push(`Referencia: ${referencia}`);
    }
    lineas.push(`Nombre: ${nombre}`);
    lineas.push(`WhatsApp: ${telefono}`);
    if (correo.trim()) lineas.push(`Correo: ${correo}`);
    lineas.push("");
    lineas.push("Quedo atento(a) a la confirmación y al costo total.");
    return lineas.join("\n");
  }

  function handleEnviar() {
    if (!puedeEnviar) return;
    const mensaje = construirMensaje();

    if (porWhatsapp) {
      const url = `https://wa.me/${assistant.whatsapp}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
    if (porCorreo) {
      // TODO(backend): agregar el correo real del laboratorio como destinatario
      // en cuanto esté confirmado (por ahora se deja vacío para que la persona
      // elija a quién enviarlo desde su propio cliente de correo).
      const subject = encodeURIComponent("Solicitud de cita — Laboratorios Muñoz");
      const body = encodeURIComponent(mensaje);
      window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
    }
    setEnviado(true);
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-[50rem] px-5 py-20 text-center lg:px-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-munoz-mist text-munoz-navy/40">
          <ShoppingCart size={26} aria-hidden />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-munoz-navy">Tu carrito está vacío</h1>
        <p className="mt-2 text-munoz-navy/60">
          Agrega los análisis que necesitas desde nuestro catálogo de servicios.
        </p>
        <Link
          href="/servicios"
          className={`mt-6 inline-flex items-center gap-2 rounded-full bg-munoz-navy px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-munoz-blue ${focus}`}
        >
          Ver servicios
          <ChevronRight size={16} aria-hidden />
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[60rem] px-5 py-12 lg:px-10">
      <h1 className="text-3xl font-bold text-munoz-navy sm:text-4xl">Tu carrito de análisis</h1>
      <p className="mt-2 text-munoz-navy/60">
        Revisa tu selección y elige cómo quieres agendar. El costo total se confirma junto con el laboratorio.
      </p>

      {/* Lista de análisis */}
      <div className="mt-8 rounded-2xl border border-munoz-navy/10 bg-white shadow-sm">
        <ul className="divide-y divide-munoz-navy/8">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="font-semibold text-munoz-navy">{item.name}</p>
                <span className="text-xs font-medium text-munoz-navy/45">
                  {categoryLabel[item.category]}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={`Quitar ${item.name} del carrito`}
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-munoz-navy/40 transition-colors hover:bg-red-50 hover:text-red-500 ${focus}`}
              >
                <X size={16} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <Link href="/servicios" className={`text-sm font-semibold text-munoz-blue hover:text-munoz-navy ${focus}`}>
            + Seguir agregando análisis
          </Link>
          <button
            type="button"
            onClick={clear}
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-munoz-navy/50 hover:text-red-500 ${focus}`}
          >
            <Trash2 size={14} aria-hidden /> Vaciar carrito
          </button>
        </div>
      </div>

      {enviado ? (
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-munoz-green/30 bg-munoz-green/5 p-6">
          <Check size={22} className="mt-0.5 shrink-0 text-munoz-green" aria-hidden />
          <div>
            <p className="font-semibold text-munoz-navy">¡Listo! Tu solicitud está preparada.</p>
            <p className="mt-1 text-sm text-munoz-navy/60">
              Se abrió {porWhatsapp && porCorreo ? "WhatsApp y tu correo" : porWhatsapp ? "WhatsApp" : "tu correo"} con
              el mensaje listo para enviar. Si no se abrió, revisa que tu navegador no haya bloqueado la ventana
              emergente.
            </p>
            <button
              type="button"
              onClick={() => setEnviado(false)}
              className={`mt-3 text-sm font-semibold text-munoz-blue hover:text-munoz-navy ${focus}`}
            >
              Volver a editar
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Paso 1: modalidad */}
          <div className="mt-10">
            <h2 className="text-lg font-bold text-munoz-navy">¿Cómo quieres atenderte?</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setModalidad("sede")}
                className={`flex items-start gap-3 rounded-2xl border-2 p-5 text-left transition-colors ${focus} ${
                  modalidad === "sede"
                    ? "border-munoz-blue bg-munoz-blue/5"
                    : "border-munoz-navy/10 bg-white hover:border-munoz-blue/40"
                }`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-munoz-blue/10 text-munoz-blue">
                  <Building2 size={20} aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-munoz-navy">Atención en sede</p>
                  <p className="mt-1 text-sm text-munoz-navy/55">
                    Elige la sede más cercana a ti o la que prefieras.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setModalidad("domicilio")}
                className={`flex items-start gap-3 rounded-2xl border-2 p-5 text-left transition-colors ${focus} ${
                  modalidad === "domicilio"
                    ? "border-munoz-green bg-munoz-green/5"
                    : "border-munoz-navy/10 bg-white hover:border-munoz-green/40"
                }`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-munoz-green/10 text-munoz-green">
                  <Home size={20} aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-munoz-navy">Atención a domicilio</p>
                  <p className="mt-1 text-sm text-munoz-navy/55">
                    Vamos nosotros a tomar tus muestras donde estés.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Paso 2a: sede */}
          {modalidad === "sede" && (
            <div className="animate-fade-up mt-8 rounded-2xl border border-munoz-navy/10 bg-white p-6">
              <h3 className="font-bold text-munoz-navy">¿En qué zona vives?</h3>
              <p className="mt-1 text-sm text-munoz-navy/55">
                Te sugerimos la sede más cercana. Si prefieres, puedes elegirla tú mismo.
              </p>

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
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${focus} ${
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
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${focus} ${
                    elegirSedeManual
                      ? "bg-munoz-navy text-white"
                      : "bg-munoz-mist text-munoz-navy/70 hover:bg-munoz-navy/10"
                  }`}
                >
                  Prefiero elegir yo la sede
                </button>
              </div>

              {(sedesSugeridas.length > 0 || elegirSedeManual) && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {(elegirSedeManual ? sedes : sedesSugeridas).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSedeId(s.id)}
                      className={`flex items-start gap-2.5 rounded-xl border-2 p-4 text-left transition-colors ${focus} ${
                        sedeId === s.id
                          ? "border-munoz-blue bg-munoz-blue/5"
                          : "border-munoz-navy/10 hover:border-munoz-blue/30"
                      }`}
                    >
                      <MapPin size={16} className="mt-0.5 shrink-0 text-munoz-green" aria-hidden />
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

          {/* Paso 2b: domicilio */}
          {modalidad === "domicilio" && (
            <div className="animate-fade-up mt-8 rounded-2xl border border-munoz-navy/10 bg-white p-6">
              <h3 className="font-bold text-munoz-navy">Datos para la atención a domicilio</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="direccion" className={labelClass}>Dirección</label>
                  <input
                    id="direccion"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Calle, número, urbanización…"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="distrito" className={labelClass}>Distrito / ciudad</label>
                  <input
                    id="distrito"
                    value={distrito}
                    onChange={(e) => setDistrito(e.target.value)}
                    placeholder="Ej. Cayma, Arequipa"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="referencia" className={labelClass}>Referencia (opcional)</label>
                  <input
                    id="referencia"
                    value={referencia}
                    onChange={(e) => setReferencia(e.target.value)}
                    placeholder="Ej. frente al parque"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Paso 3: fecha y contacto */}
          {modalidad && (
            <div className="animate-fade-up mt-8 rounded-2xl border border-munoz-navy/10 bg-white p-6">
              <h3 className="font-bold text-munoz-navy">Tus datos y la fecha</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="fecha" className={labelClass}>Fecha deseada</label>
                  <input
                    id="fecha"
                    type="date"
                    min={todayISO()}
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="nombre" className={labelClass}>Nombre completo</label>
                  <input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className={labelClass}>WhatsApp</label>
                  <input
                    id="telefono"
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+51 9xx xxx xxx"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="correo" className={labelClass}>Correo (opcional)</label>
                  <input
                    id="correo"
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Paso 4: canal de envío */}
          {modalidad && (
            <div className="animate-fade-up mt-8 rounded-2xl border border-munoz-navy/10 bg-white p-6">
              <h3 className="font-bold text-munoz-navy">¿Cómo quieres enviar tu solicitud?</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                <label
                  className={`flex cursor-pointer items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                    porWhatsapp ? "border-munoz-green bg-munoz-green/10 text-munoz-green" : "border-munoz-navy/10 text-munoz-navy/60"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={porWhatsapp}
                    onChange={(e) => setPorWhatsapp(e.target.checked)}
                    className="sr-only"
                  />
                  <MessageCircle size={15} aria-hidden /> WhatsApp
                </label>
                <label
                  className={`flex cursor-pointer items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                    porCorreo ? "border-munoz-blue bg-munoz-blue/10 text-munoz-blue" : "border-munoz-navy/10 text-munoz-navy/60"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={porCorreo}
                    onChange={(e) => setPorCorreo(e.target.checked)}
                    className="sr-only"
                  />
                  <Mail size={15} aria-hidden /> Correo
                </label>
              </div>
              {faltaCanal && (
                <p className="mt-2 text-xs font-medium text-red-500">Elige al menos un canal de envío.</p>
              )}

              <button
                type="button"
                onClick={handleEnviar}
                disabled={!puedeEnviar}
                className={`mt-6 inline-flex items-center gap-2 rounded-full bg-munoz-navy px-7 py-3 text-sm font-bold text-white shadow-lg shadow-munoz-navy/20 transition-transform hover:-translate-y-0.5 hover:bg-munoz-blue disabled:pointer-events-none disabled:opacity-40 ${focus}`}
              >
                Enviar solicitud
                <ChevronRight size={16} aria-hidden />
              </button>
            </div>
          )}
        </>
      )}

      {/* Referencia discreta a otros accesos, por si quiere volver */}
      <div className="mt-10 flex flex-wrap gap-2 text-sm text-munoz-navy/45">
        <span>También puedes:</span>
        {quickServices.map((s) => (
          <Link key={s.id} href={s.href} className={`font-semibold text-munoz-blue hover:text-munoz-navy ${focus}`}>
            {s.label}
          </Link>
        ))}
      </div>
    </section>
  );
}