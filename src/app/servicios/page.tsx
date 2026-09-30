import type { Metadata } from "next";
import { ServiciosExplorer } from "@/components/servicios/ServiciosExplorer";

export const metadata: Metadata = {
  title: "Servicios | Laboratorios Muñoz",
  description:
    "Explora el catálogo de análisis clínicos, perfiles y vacunas de Laboratorios Muñoz.",
};

export default function ServiciosPage() {
  return <ServiciosExplorer />;
}