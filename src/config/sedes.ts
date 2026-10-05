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
  // Algunas sedes (Peral, Yanahuara) también tienen un fijo además del
  // celular. Opcional: se muestra solo si existe.
  phoneAlt?: string;
  phoneAltDisplay?: string;
};

// Sedes reales del laboratorio (de la web actual). Cuando exista el backend,
// esto se reemplaza por una consulta a /sedes.
export const sedes: Sede[] = [
  {
    id: "cercado-peral",
    name: "Peral (Sede principal)",
    city: "Arequipa",
    zone: "Cercado",
    address: "Calle Peral 215, Cercado, Arequipa",
    phone: "51958918553",
    phoneDisplay: "958 918 553",
    phoneAlt: "5154243098",
    phoneAltDisplay: "054 243098",
  },
  {
    id: "yanahuara",
    name: "Yanahuara — Parque del Avión",
    city: "Arequipa",
    zone: "Yanahuara",
    address: "Urb. Valencia H-6, Parque del Avión, Yanahuara, Arequipa",
    phone: "51991124838",
    phoneDisplay: "991 124 838",
    phoneAlt: "5154255793",
    phoneAltDisplay: "054 255793",
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
    // TODO(backend/contenido): falta la dirección exacta (calle y número) de
    // esta sede — solo se confirmó que existe (tiene su propio portal de
    // resultados: labmunozeu.resultados.ingenius.online) y su teléfono. No
    // se inventa el número de calle hasta tenerlo.
    id: "estados-unidos",
    name: "Av. Estados Unidos",
    city: "Arequipa",
    zone: "Estados Unidos",
    address: "Av. Estados Unidos, Arequipa (falta confirmar el número exacto)",
    phone: "51956731140",
    phoneDisplay: "956 731 140",
  },
  {
    id: "lima-jesus-maria",
    name: "Lima — Jesús María",
    city: "Lima",
    zone: "Jesús María",
    address: "Av. Ricardo Tizón y Bueno 150, Jesús María, Lima",
    phone: "51947266803",
    phoneDisplay: "947 266 803",
  },
];

// Zonas únicas, para el selector "¿en qué zona vives?" del carrito.
export const zonasConSede = Array.from(new Set(sedes.map((s) => s.zone)));