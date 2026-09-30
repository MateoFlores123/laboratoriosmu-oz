// Ola decorativa de la marca. Es puramente visual (aria-hidden) y no captura clics.
export function HeaderWave() {
  const paths = [
    "M0 38 C 240 6, 420 62, 700 34 S 1160 8, 1440 40",
    "M0 46 C 260 14, 460 70, 720 42 S 1180 16, 1440 48",
    "M0 54 C 280 24, 480 76, 740 50 S 1200 26, 1440 56",
    "M0 30 C 200 60, 520 0, 780 28 S 1200 54, 1440 26",
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-full -mt-9 h-[72px] w-full"
    >
      {paths.map((d, i) => (
        <path key={d} d={d} fill="none" stroke="var(--color-munoz-aqua)" strokeWidth={i === 2 ? 5 : 2}
              strokeOpacity={i === 2 ? 0.55 : 0.8} />
      ))}
    </svg>
  );
}