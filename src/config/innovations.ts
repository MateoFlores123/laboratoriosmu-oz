// Novedades del laboratorio: dos equipos nuevos (ecógrafo con IA y rayos X de
// última generación — el rayos X no usa IA) y un nuevo sistema de química e
// inmunobioquímica (resultados mucho más rápidos, disponible en todas las
// sedes). "serviceId" enlaza con el catálogo (src/config/services.ts) para
// poder agregarlos al carrito y abrir su ficha en /servicios/[id].
//
// Esta lista completa (las 3) se usa en /servicios (InnovationsBanner y el
// aviso/modal de promoción). La sección "Nuevas innovaciones" del inicio
// (Innovations.tsx) solo muestra los dos EQUIPOS (ecógrafo y rayos X): filtra
// explícitamente por id, así que si agregas más ítems aquí no aparecen solos
// en el inicio a menos que también edites ese filtro.
export type Innovation = {
  id: string;
  serviceId: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const innovations: Innovation[] = [
  {
    id: "ecografo",
    serviceId: "ecografia-con-inteligencia-artificial",
    title: "Ecógrafo con Inteligencia Artificial",
    description:
      "Tecnología de ecografía asistida por IA que agiliza la lectura de imágenes y mejora la precisión del diagnóstico.",
    image: "/innovaciones/ecografo-ia.jpg",
    alt: "Equipo de ecografía con inteligencia artificial en una de nuestras sedes",
  },
  {
    id: "rayosx",
    serviceId: "rayos-x-de-ultima-generacion",
    title: "Rayos X de última generación",
    description:
      "Nuestro nuevo equipo de rayos X de última generación ayuda a obtener imágenes más nítidas y resultados más rápidos para tu médico.",
    image: "/innovaciones/rayos-x-ia.jpg",
    alt: "Equipo de rayos X de última generación en una de nuestras sedes",
  },
  {
    // TODO(backend/contenido): falta la imagen real de este sistema (no es
    // un equipo visible como los otros dos). Puede ser una foto del área de
    // procesamiento/laboratorio o un gráfico ilustrativo — pide la pieza al
    // diseñador y colócala en esta ruta.
    id: "quimica",
    serviceId: "quimica-e-inmunobioquimica",
    title: "Química e Inmunobioquímica",
    description:
      "Nuevo sistema de química e inmunobioquímica que acelera el procesamiento de tus análisis, entregando resultados mucho más rápido.",
    image: "/innovaciones/quimica-inmunobioquimica.jpg",
    alt: "Área de química e inmunobioquímica del laboratorio",
  },
];