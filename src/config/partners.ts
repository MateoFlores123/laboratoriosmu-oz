// Instituciones/certificaciones que respaldan al laboratorio, para la franja
// "Respaldo y confianza" del inicio.
//
// ⚠️ IMPORTANTE: los 6 nombres y rutas de abajo son RELLENO de ejemplo
// (placeholders), NO instituciones reales confirmadas. Por política del
// proyecto no se inventan alianzas, certificaciones ni logos reales sin que
// el laboratorio los confirme. Antes de publicar esta sección:
//   1) reemplaza "name" por el nombre real de cada institución (se usa como
//      texto alternativo de su logo, para accesibilidad y SEO), y
//   2) coloca su logo real en public/partners/ con el nombre de archivo que
//      pongas en "logo" (ideal: PNG con fondo transparente).
export type Partner = {
  id: string;
  name: string;
  logo: string; // ruta en /public/partners/...
};

export const partners: Partner[] = [
  { id: "partner-1", name: "Institución aliada 1", logo: "/partners/partner-1.png" },
  { id: "partner-2", name: "Institución aliada 2", logo: "/partners/partner-2.png" },
  { id: "partner-3", name: "Institución aliada 3", logo: "/partners/partner-3.png" },
  { id: "partner-4", name: "Institución aliada 4", logo: "/partners/partner-4.png" },
  { id: "partner-5", name: "Institución aliada 5", logo: "/partners/partner-5.png" },
  { id: "partner-6", name: "Institución aliada 6", logo: "/partners/partner-6.png" },
];