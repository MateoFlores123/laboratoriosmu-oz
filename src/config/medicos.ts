export const howItWorksSteps = [
  { id: 1, title: "Regístrate" },
  { id: 2, title: "Recibe tu código" },
  { id: 3, title: "Deriva pacientes" },
  { id: 4, title: "Recibe informes especializados" },
] as const;

// Resumen de los beneficios reales para médicos aliados. Se dejaron 4 de los
// 8 originales, los de mayor peso para un médico que recién conoce el programa.
export const doctorBenefits = [
  {
    id: "atencion",
    title: "Atención preferencial",
    text: "Canal exclusivo para médicos, con prioridad en consultas, seguimiento de casos y coordinación de exámenes.",
  },
  {
    id: "resultados",
    title: "Resultados rápidos y confiables",
    text: "Procesos optimizados que garantizan tiempos de respuesta ágiles, sin comprometer calidad ni trazabilidad.",
  },
  {
    id: "informes",
    title: "Informes completos y claros",
    text: "Reportes fáciles de leer, con valores de referencia y apoyo para la interpretación clínica.",
  },
  {
    id: "portal",
    title: "Portal médico digital",
    text: "Acceso seguro a resultados, historial de pacientes e informes digitales desde una sola plataforma.",
  },
] as const;

// TODO: reemplazar por fotos reales del equipo médico o instalaciones
export const medicosGallery = [
  "/medicos/galeria-1.jpg",
  "/medicos/galeria-2.jpg",
  "/medicos/galeria-3.jpg",
  "/medicos/galeria-4.jpg",
];