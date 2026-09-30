import type { Metadata } from "next";
import { CarritoView } from "@/components/carrito/CarritoView";

export const metadata: Metadata = {
  title: "Tu carrito | Laboratorios Muñoz",
  description: "Revisa los análisis que seleccionaste y agenda tu cita en sede o a domicilio.",
};

export default function CarritoPage() {
  return <CarritoView />;
}