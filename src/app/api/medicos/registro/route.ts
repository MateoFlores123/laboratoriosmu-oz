import { reenviar } from "@/lib/api/reenviar";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return reenviar(request, "MEDICOS_ENDPOINT_URL", ["nombres", "apellidos", "colegiatura", "email", "whatsapp"]);
}