import { reenviar } from "@/lib/api/reenviar";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return reenviar(request, "SOLICITUDES_ENDPOINT_URL", ["modalidad", "fecha", "examenes", "paciente"]);
}