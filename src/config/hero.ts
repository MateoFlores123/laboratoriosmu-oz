export const HERO_DURATION_MS = 6500;

export type HeroSlide = {
  id: string;
  label: string; // texto de la insignia sobre el titular
  title: string;
  highlight?: string; // frase exacta dentro de "title" que se resalta en verde
  text: string;
  image: string;
  alt: string;
  cta: { label: string; href: string };
};

export const heroSlides: HeroSlide[] = [
  {
    id: "analisis",
    label: "Análisis clínicos",
    title: "Tus análisis clínicos, con la tecnología que tu diagnóstico necesita",
    highlight: "diagnóstico necesita",
    text: "Más de 3000 análisis clínicos y de diagnóstico, procesados con equipos de última generación.",
    image: "/hero/analisis.jpg",
    alt: "Profesionales del laboratorio revisando resultados en una pantalla",
    cta: { label: "Cotizar mis análisis", href: "/cotizar" },
  },
  {
    id: "domicilio",
    label: "Atención a domicilio",
    title: "Te tomamos la muestra en casa, todos los días del año",
    highlight: "todos los días del año",
    text: "Fuimos los primeros en ofrecer atención a domicilio. Nuestro equipo llega donde estés, los 365 días.",
    image: "/hero/domicilio.jpg",
    alt: "Enfermera atendiendo a un paciente en su hogar",
    cta: { label: "Pedir atención a domicilio", href: "/atencion-a-domicilio" },
  },
  {
    // TODO(backend/contenido): confirmar nombre exacto del equipo y sede(s) donde
    // está disponible; por ahora el CTA "Más información" enlaza al catálogo
    // general de servicios hasta que exista una página propia del equipo.
    id: "ecografo",
    label: "Nuevo equipo",
    title: "Ecógrafo con Inteligencia Artificial para diagnósticos más precisos",
    highlight: "Inteligencia Artificial",
    text: "Sumamos tecnología de ecografía asistida por IA que agiliza la lectura de imágenes y mejora la precisión del diagnóstico.",
    image: "/hero/ecografo-ia.jpg",
    alt: "Equipo de ecografía con inteligencia artificial en una de nuestras sedes",
    cta: { label: "Más información", href: "/servicios" },
  },
  {
    // TODO(backend/contenido): mismo caso que el slide anterior — reemplazar el
    // href por la ficha del servicio/equipo cuando exista.
    id: "rayosx",
    label: "Nuevo equipo",
    title: "Rayos X de última generación, resultados más rápidos y claros",
    highlight: "última generación",
    text: "Nuestro nuevo equipo de rayos X de última generación ayuda a obtener imágenes más nítidas y resultados más rápidos para tu médico.",
    image: "/hero/rayos-x-ia.jpg",
    alt: "Equipo de rayos X de última generación en una de nuestras sedes",
    cta: { label: "Más información", href: "/servicios" },
  },
  {
    // TODO(backend/contenido): falta una imagen propia para este slide (no es
    // un equipo visible). Por ahora reutiliza la misma foto/placeholder del
    // anuncio en /servicios (src/config/innovations.ts); reemplázala cuando
    // haya una imagen o gráfico ilustrativo del área de procesamiento.
    id: "quimica",
    label: "Nueva tecnología",
    title: "Química e Inmunoquímica: resultados mucho más rápido",
    highlight: "mucho más rápido",
    text: "Actualizamos el sistema con el que procesamos tus análisis de química sanguínea e inmunología. Se usa en todos tus análisis, en todas nuestras sedes.",
    image: "/innovaciones/quimica-inmunobioquimica.jpg",
    alt: "Área de química e inmunobioquímica del laboratorio",
    cta: { label: "Conocer más", href: "/servicios" },
  },
];