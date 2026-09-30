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
    title: "Rayos X con Inteligencia Artificial, resultados más rápidos y claros",
    highlight: "Inteligencia Artificial",
    text: "Nuestro nuevo equipo de rayos X con IA ayuda a detectar hallazgos con mayor rapidez y claridad para tu médico.",
    image: "/hero/rayos-x-ia.jpg",
    alt: "Equipo de rayos X con inteligencia artificial en una de nuestras sedes",
    cta: { label: "Más información", href: "/servicios" },
  },
];