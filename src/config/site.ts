export const brand = {
  name: "Centro de Diagnóstico Muñoz",
  logo: "/brand/logo-munoz.png",
  // Versión clara del logo, para fondos oscuros (footer). La web actual ya
  // tiene una versión así ("logo_white.png"); pide esa misma pieza al diseñador.
  logoLight: "/brand/logo-munoz-light.png",
};

// Fuente única de la navegación. Cuando exista CMS/backend, solo cambia de dónde se lee.
export const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Sedes", href: "/sedes" },
  { label: "Médicos", href: "/medicos" },
] as const;

// TODO(backend/contenido): "cotizar" ya no navega a una página — el botón
// "Cotizar" abre el carrito (useCart().openCart()) en Navbar/Footer. Se deja
// aquí solo por si algún componente viejo todavía la referencia.
export const navActions = {
  agendar: "/servicios",
  cotizar: "/servicios",
  cuenta: "/cuenta",
  ingresar: "/ingresar",
};

// Servicios destacados en el pie del hero y accesos rápidos del footer. El
// ícono y el color de cada uno se definen en Hero.tsx a partir del "id".
//
// "domicilio" y "resultados" no tienen página propia todavía: los portales
// reales de resultados por sede ya están en el desplegable "Resultados" del
// Navbar (ver resultadosLinks más abajo); como son 7 enlaces distintos por
// sede, este acceso rápido no puede apuntar a uno solo, así que abre
// WhatsApp para que te ayudemos a encontrar el tuyo (⚠ el número debe
// coincidir con assistant.whatsapp, más abajo en este archivo).
export const quickServices = [
  { id: "analisis", label: "Análisis clínicos", href: "/servicios#analisis-clinicos" },
  {
    id: "domicilio",
    label: "Atención a domicilio",
    href: "https://wa.me/51993501938?text=" + encodeURIComponent("Hola, quisiera información sobre atención a domicilio."),
  },
  { id: "ocupacional", label: "Salud ocupacional", href: "/servicios#salud-ocupacional" },
  {
    id: "resultados",
    label: "Resultados en línea",
    href: "https://wa.me/51993501938?text=" + encodeURIComponent("Hola, quisiera ver los resultados de mis análisis."),
  },
] as const;

// Sedes reales del laboratorio (de la web actual). Cuando exista el backend,
// esto se reemplaza por la consulta a /sedes.
export const locations = {
  arequipa: {
    phone: "993501938",
    phoneDisplay: "993 501 938",
    sedes: [
      "Cercado — Calle Peral 215",
      "Yanahuara — Parque del Avión",
      "Cercado — frente al Hospital Honorio Delgado",
      "Pedregal — Av. Zamácola",
      "Cerro Colorado — Av. Pumacahua",
    ],
  },
  lima: {
    phone: "957218309",
    phoneDisplay: "957 218 309",
    sedes: ["San Juan de Miraflores — Calle Maximiliano Carranza 1194"],
  },
};

export const social = {
  facebook: "https://web.facebook.com/Laboratoriomunoz/",
};

// Portales externos de resultados por sede (cada sede usa su propio sistema).
// Enlaces reales entregados por el laboratorio.
export const resultadosLinks = [
  { label: "Resultados sede Lima", href: "https://lmlima.resultados.ingenius.online/" },
  { label: "Resultados sede Estados Unidos", href: "https://labmunozeu.resultados.ingenius.online/" },
  { label: "Resultados sede Peral", href: "http://applabserver.com/labmunoz/resultadosweb" },
  { label: "Resultados sede Honorio Delgado", href: "http://applabserver.com/bluemedical/resultadosweb" },
  { label: "Resultados sede Parque del Avión", href: "http://applabserver.com/tusalud/resultadosweb" },
  { label: "Resultados para médicos", href: "http://applabserver.com/labmunoz/resultadosweb" },
  { label: "Resultados de convenios", href: "http://applabserver.com/labmunoz/resultadosweb" },
] as const;

// Asistente flotante (video del señor que saluda)
export const assistant = {
  // Pon en true SOLO si generaste el video sin fondo (asistente.webm)
  transparent: true,
  webm: "/brand/asistente.webm",
  mp4: "/brand/asistente.mp4",
  whatsapp: "51993501938", // ⚠ confirma el número real (código de país + número, sin + ni espacios)
  messages: [
    "¿Tienes alguna pregunta?",
    "¿Dudas para tus exámenes?",
    "Pregúntanos lo que gustes",
    "Te ayudamos a elegir tu análisis",
  ],
  // TODO: "Cotizar mis exámenes" idealmente debería abrir el carrito
  // (useCart().openCart()) en vez de navegar; se deja como link a /servicios
  // hasta que el componente del asistente use el carrito directamente.
  quickLinks: [
    { label: "Cotizar mis exámenes", href: "/servicios" },
    { label: "Agendar una cita", href: "/servicios" },
    {
      label: "Atención a domicilio",
      href: "https://wa.me/51993501938?text=" + encodeURIComponent("Hola, quisiera información sobre atención a domicilio."),
    },
  ],
};