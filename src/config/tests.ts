// Análisis más solicitados (vista rápida en el inicio). Los "id" están
// enlazados al catálogo real (src/config/services.ts) para que cada tarjeta
// lleve a su ficha real (/servicios/[id]) y pueda agregarse al carrito.
// TODO(backend): cuando exista un ranking real de análisis más pedidos,
// reemplazar esta lista fija por esa consulta.
export const frequentTests = [
  { id: "hemograma-automatizado", name: "Hemograma completo (CBC)" },
  { id: "glucosa-basal-glicemia", name: "Glucosa en ayunas" },
  {
    id: "perfil-lipidico-r-coronario-col-tot-col-hdl-colt-ldl-col-vldl-trig-rel-ldl-hdl-rel-col-hdl",
    name: "Perfil lipídico",
  },
  {
    id: "perfil-hepatico-sin-ggtp-bil-dir-bil-ind-bil-tot-alb-fosfat-alc-glob-tgo-tgp-prot-tot",
    name: "Pruebas hepáticas",
  },
  { id: "urocultivo", name: "Urocultivo" },
  { id: "perfil-tiroideo-tsh-t4-lib-t3", name: "Perfil tiroideo (TSH, T3, T4)" },
] as const;