// Fondo de ondas celestes/verdes, coherente con el resto del sitio (Nav, Médicos).
export function ServiciosWaves() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 500"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 h-[420px] w-full"
    >
      <path
        d="M0 80 C 260 20, 480 140, 760 70 S 1220 0, 1440 90"
        fill="none"
        stroke="var(--color-munoz-blue)"
        strokeWidth="2"
        strokeOpacity="0.14"
      />
      <path
        d="M0 180 C 300 110, 520 250, 800 160 S 1240 90, 1440 190"
        fill="none"
        stroke="var(--color-munoz-aqua)"
        strokeWidth="2"
        strokeOpacity="0.28"
      />
      <path
        d="M0 300 C 280 230, 540 380, 820 300 S 1220 210, 1440 310"
        fill="none"
        stroke="var(--color-munoz-green)"
        strokeWidth="2"
        strokeOpacity="0.18"
      />
    </svg>
  );
}