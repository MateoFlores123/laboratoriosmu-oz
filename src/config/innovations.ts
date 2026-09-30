// Equipos nuevos del laboratorio (ecografía y rayos X con IA). Se usa tanto
// en la sección "Nuevas innovaciones" del inicio como en el banner de
// /servicios. "serviceId" enlaza con el catálogo (src/config/services.ts)
// para poder agregarlos al carrito y abrir su ficha en /servicios/[id].
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
    serviceId: "rayos-x-con-inteligencia-artificial",
    title: "Rayos X con Inteligencia Artificial",
    description:
      "Nuestro nuevo equipo de rayos X con IA ayuda a detectar hallazgos con mayor rapidez y claridad para tu médico.",
    image: "/innovaciones/rayos-x-ia.jpg",
    alt: "Equipo de rayos X con inteligencia artificial en una de nuestras sedes",
  },
];