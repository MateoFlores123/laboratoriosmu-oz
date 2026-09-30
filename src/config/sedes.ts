export type Sede = {
  id: string;
  name: string;
  city: "Arequipa" | "Lima";
  // Distrito/zona real (ya está en el nombre/dirección de cada sede). Se usa
  // para sugerir la sede más cercana según dónde vive la persona, sin
  // necesidad de coordenadas ni geolocalización.
  zone: string;
  address: string;
  phone: string; // solo dígitos, con código de país, para tel: y wa.me
  phoneDisplay: string;
};

// Sedes reales del laboratorio (de la web actual). Cuando exista el backend,
// esto se reemplaza por una consulta a /sedes.
export const sedes: Sede[] = [
  {
    id: "cercado-peral",
    name: "Cercado — Peral",
    city: "Arequipa",
    zone: "Cercado",
    address: "Calle Peral 215, Cercado, Arequipa",
    phone: "51993501938",
    phoneDisplay: "993 501 938",
  },
  {
    id: "yanahuara",
    name: "Yanahuara — Parque del Avión",
    city: "Arequipa",
    zone: "Yanahuara",
    address: "Urb. Valencia H-6, Parque del Avión, Yanahuara, Arequipa",
    phone: "51991124838",
    phoneDisplay: "991 124 838",
  },
  {
    id: "cercado-honorio-delgado",
    name: "Cercado — Honorio Delgado",
    city: "Arequipa",
    zone: "Cercado",
    address: "Urb. Pablo VI C-9, frente al Hospital Honorio Delgado, Arequipa",
    phone: "51989505045",
    phoneDisplay: "989 505 045",
  },
  {
    id: "pedregal",
    name: "Pedregal",
    city: "Arequipa",
    zone: "Pedregal",
    address: "Av. Zamácola Mz H Lote 3, Pedregal, Arequipa",
    phone: "51930617364",
    phoneDisplay: "930 617 364",
  },
  {
    id: "cerro-colorado",
    name: "Cerro Colorado",
    city: "Arequipa",
    zone: "Cerro Colorado",
    address: "Av. Pumacahua 111, Cerro Colorado, Arequipa",
    phone: "51993501938",
    phoneDisplay: "993 501 938",
  },
  {
    id: "lima-sjm",
    name: "San Juan de Miraflores",
    city: "Lima",
    zone: "San Juan de Miraflores",
    address: "Calle Maximiliano Carranza 1194, San Juan de Miraflores, Lima",
    phone: "51957218309",
    phoneDisplay: "957 218 309",
  },
];

// Zonas únicas, para el selector "¿en qué zona vives?" del carrito.
export const zonasConSede = Array.from(new Set(sedes.map((s) => s.zone)));