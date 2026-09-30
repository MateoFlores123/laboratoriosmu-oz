import type { Metadata } from "next";
import { SedesExplorer } from "@/components/sedes/SedesExplorer";

export const metadata: Metadata = {
  title: "Sedes | Centro de Diagnóstico Muñoz",
  description: "Encuentra la sede de Laboratorios Muñoz más cercana en Arequipa o Lima.",
};

export default function SedesPage() {
  return <SedesExplorer />;
}