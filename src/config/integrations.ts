// ───────────────────────────────────────────────────────────────────────────
// ENLACES QUE ENTREGA EL INGENIERO DE MUÑOZ — todo se configura en variables
// de entorno (archivo .env.local en tu PC y "Environment Variables" en Vercel).
// No hay que tocar código: pegas el enlace, reinicias y listo.
// Mira .env.example para la lista completa.
//
//  NEXT_PUBLIC_RESULTADOS_URL  → enlace único del botón "Resultados"
//  NEXT_PUBLIC_CHATBOT_URL     → enlace del asistente de IA (personita)
//  MEDICOS_ENDPOINT_URL        → (solo servidor) recibe el JSON del registro de médicos
//  SOLICITUDES_ENDPOINT_URL    → (solo servidor) recibe el JSON de delivery / atención en sede
//  INTEGRATIONS_API_KEY        → (solo servidor, opcional) clave si el ingeniero la pide
//
// Las variables SIN "NEXT_PUBLIC_" nunca llegan al navegador: por eso los
// endpoints de médicos y solicitudes se llaman desde /api/... (servidor) y no
// directo desde el navegador. Así el enlace y la clave quedan ocultos.
// ───────────────────────────────────────────────────────────────────────────

const limpio = (v: string | undefined) => (v && v.trim() ? v.trim() : null);

export const integrations = {
  /** Si existe, el botón "Resultados" es un enlace directo a esta URL (en vez del desplegable por sede). */
  resultadosUrl: limpio(process.env.NEXT_PUBLIC_RESULTADOS_URL),
  /** Si existe, el panel de la personita muestra el botón para hablar con el asistente de IA. */
  chatbotUrl: limpio(process.env.NEXT_PUBLIC_CHATBOT_URL),
};