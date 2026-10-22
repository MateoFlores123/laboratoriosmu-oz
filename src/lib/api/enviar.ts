// Envía un JSON a una ruta interna (/api/...) y devuelve qué pasó, para que
// cada formulario decida su plan B (WhatsApp) sin repetir lógica.
export type ResultadoEnvio = "ok" | "no-configurado" | "error";

export async function enviarJson(ruta: string, cuerpo: unknown): Promise<ResultadoEnvio> {
  try {
    const res = await fetch(ruta, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo),
    });
    if (res.ok) return "ok";
    if (res.status === 503) return "no-configurado";
    return "error";
  } catch {
    return "error";
  }
}