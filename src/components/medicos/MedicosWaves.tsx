// Fondo de ondas celestes/verdes, en la misma línea que HeaderWave del Navbar.
export function MedicosWaves() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 700"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <path
        d="M0 120 C 260 60, 480 180, 760 110 S 1220 40, 1440 130"
        fill="none"
        stroke="var(--color-munoz-blue)"
        strokeWidth="2"
        strokeOpacity="0.16"
      />
      <path
        d="M0 260 C 300 190, 520 330, 800 240 S 1240 170, 1440 270"
        fill="none"
        stroke="var(--color-munoz-aqua)"
        strokeWidth="2"
        strokeOpacity="0.3"
      />
      <path
        d="M0 520 C 280 450, 540 600, 820 520 S 1220 430, 1440 530"
        fill="none"
        stroke="var(--color-munoz-green)"
        strokeWidth="2"
        strokeOpacity="0.22"
      />
      <path
        d="M0 640 C 260 580, 500 700, 780 630 S 1200 560, 1440 650"
        fill="none"
        stroke="var(--color-munoz-blue)"
        strokeWidth="2"
        strokeOpacity="0.12"
      />
    </svg>
  );
}