import { NextResponse } from "next/server";

// Reenvía el JSON recibido al endpoint del ingeniero, desde el servidor.
// 503 = endpoint aún no configurado (el formulario usa su plan B).
export async function reenviar(request: Request, envVar: string, campos: string[]) {
  const destino = process.env[envVar]?.trim();
  if (!destino) return NextResponse.json({ ok: false, motivo: "no-configurado" }, { status: 503 });

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, motivo: "json-invalido" }, { status: 400 });
  }
  if (!data || typeof data !== "object" || campos.some((c) => !data[c])) {
    return NextResponse.json({ ok: false, motivo: "datos-incompletos" }, { status: 400 });
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const clave = process.env.INTEGRATIONS_API_KEY?.trim();
  if (clave) headers.Authorization = `Bearer ${clave}`;

  try {
    const res = await fetch(destino, {
      method: "POST",
      headers,
      body: JSON.stringify({ ...data, origen: "web-laboratoriosmunoz", enviadoEn: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return NextResponse.json({ ok: false, motivo: "rechazado" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, motivo: "sin-respuesta" }, { status: 502 });
  }
}