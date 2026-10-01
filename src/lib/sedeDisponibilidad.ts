import { sedes } from "@/config/sedes";
import type { LabService } from "@/config/services";

/**
 * Para servicios/equipos que solo están disponibles en una sede puntual
 * (ecógrafo, rayos X). Devuelve el texto a mostrar o null si el servicio
 * está disponible en todas las sedes.
 */
export function sedeExclusivaTexto(service: Pick<LabService, "onlySedeId">): string | null {
  if (!service.onlySedeId) return null;
  const sede = sedes.find((s) => s.id === service.onlySedeId);
  return sede ? `Disponible solo en la sede ${sede.name}` : null;
}

export function sedeExclusiva(service: Pick<LabService, "onlySedeId">) {
  if (!service.onlySedeId) return null;
  return sedes.find((s) => s.id === service.onlySedeId) ?? null;
}