import type { Metadata } from "next";
import { MedicosHero } from "@/components/medicos/MedicosHero";
import { HowItWorks } from "@/components/medicos/HowItWorks";
import { RegisterForm } from "@/components/medicos/RegisterForm";
import { Benefits } from "@/components/medicos/Benefits";

export const metadata: Metadata = {
  title: "Médicos | Laboratorios Muñoz",
  description: "Regístrate como médico aliado de Laboratorios Muñoz y accede a beneficios exclusivos.",
};

export default function MedicosPage() {
  return (
    <>
      <MedicosHero />
      <HowItWorks />
      <RegisterForm />
      <Benefits />
    </>
  );
}