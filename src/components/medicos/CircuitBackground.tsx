// Textura decorativa de "circuitos" reutilizable, inspirada en las piezas
// gráficas del laboratorio. Usa currentColor: el color se controla con la
// clase de texto del contenedor (ej. "text-munoz-navy/10").
export function CircuitBackground({ className = "" }: { className?: string }) {
  const id = "circuit-pattern";
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <pattern id={id} width="130" height="130" patternUnits="userSpaceOnUse">
          <path
            d="M0 65 H45 V25 H95 V0 M45 65 V110 H130 M95 25 V65 H130"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="45" cy="65" r="2.6" fill="currentColor" />
          <circle cx="95" cy="25" r="2.6" fill="currentColor" />
          <circle cx="45" cy="110" r="2.6" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}