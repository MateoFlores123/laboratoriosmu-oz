// Fichas informativas de los análisis más solicitados. No cubre las 495
// pruebas del catálogo (sería poco confiable redactar indicaciones médicas
// para todas sin una fuente clínica que las respalde); se completó primero
// con los análisis más comunes y se puede seguir ampliando con el tiempo.
//
// El contenido usa criterios generales y ampliamente aceptados de
// preparación para toma de muestra (ayuno, tipo de muestra, etc.). No
// reemplaza la indicación de tu médico ni el protocolo oficial del
// laboratorio: ante cualquier duda, confirma con Laboratorios Muñoz antes
// de la toma de muestra.
//
// TODO(backend): reemplazar por la ficha oficial de cada análisis cuando
// exista un catálogo clínico centralizado.
export type ExamDetail = {
  description: string;
  muestra: string;
  requisitos: string[];
};

export const examDetails: Record<string, ExamDetail> = {
  "ecografia-con-inteligencia-artificial": {
    description:
      "Estudio de imagen por ultrasonido, apoyado con inteligencia artificial para analizar tejidos y estructuras internas con mayor precisión y rapidez.",
    muestra: "No aplica — es un estudio de imagen, no requiere muestra de sangre.",
    requisitos: [
      "La preparación (por ejemplo, ayuno o vejiga llena) depende de la zona a evaluar; se confirma contigo al momento de agendar.",
    ],
  },
  "rayos-x-de-ultima-generacion": {
    description:
      "Estudio radiológico con equipo de última generación, que ofrece imágenes más nítidas y agiliza la obtención de resultados para tu médico.",
    muestra: "No aplica — es un estudio de imagen, no requiere muestra de sangre.",
    requisitos: [
      "No suele requerir preparación especial; cualquier indicación particular para tu caso se confirma al agendar.",
    ],
  },
  // "quimica-e-inmunobioquimica" ya no es un servicio del catálogo (ver la
  // nota en services.ts) por lo que no necesita ficha aquí; solo se anuncia
  // como novedad en /servicios y en el inicio.
  "hemograma-automatizado": {
    description:
      "Cuenta y evalúa los glóbulos rojos, glóbulos blancos y plaquetas. Ayuda a detectar anemia, infecciones, procesos inflamatorios y otros trastornos de la sangre.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  "glucosa-basal-glicemia": {
    description:
      "Mide el nivel de glucosa (azúcar) en la sangre en ayunas. Es uno de los análisis clave para detectar o controlar la diabetes.",
    muestra: "Sangre venosa",
    requisitos: ["Ayuno de 8 a 12 horas (se puede tomar agua)."],
  },
  "glucosa-basal-y-post-prandial": {
    description:
      "Compara la glucosa en ayunas con la glucosa 2 horas después de comer, para evaluar cómo el cuerpo procesa los alimentos.",
    muestra: "Sangre venosa (dos tomas)",
    requisitos: [
      "Ayuno de 8 a 12 horas para la primera muestra.",
      "Segunda muestra 2 horas después de iniciar una comida habitual.",
    ],
  },
  colesterol: {
    description: "Mide el colesterol total en sangre, un indicador del riesgo cardiovascular.",
    muestra: "Sangre venosa",
    requisitos: ["Ayuno de 9 a 12 horas.", "Evitar comidas muy grasas la noche anterior."],
  },
  "colesterol-serico": {
    description: "Mide el colesterol total en sangre, un indicador del riesgo cardiovascular.",
    muestra: "Sangre venosa",
    requisitos: ["Ayuno de 9 a 12 horas.", "Evitar comidas muy grasas la noche anterior."],
  },
  "colesterol-hdl": {
    description:
      "Mide el colesterol \"bueno\" (HDL), que ayuda a retirar el exceso de colesterol del cuerpo. Se suele pedir junto con el perfil lipídico completo.",
    muestra: "Sangre venosa",
    requisitos: ["Ayuno de 9 a 12 horas."],
  },
  "colesterol-ldl": {
    description:
      "Mide el colesterol \"malo\" (LDL), asociado a mayor riesgo cardiovascular cuando está elevado. Se suele pedir junto con el perfil lipídico completo.",
    muestra: "Sangre venosa",
    requisitos: ["Ayuno de 9 a 12 horas."],
  },
  trigliceridos: {
    description:
      "Mide la grasa (triglicéridos) circulante en la sangre, relacionada con el riesgo cardiovascular.",
    muestra: "Sangre venosa",
    requisitos: ["Ayuno de 12 horas.", "Evitar el consumo de alcohol 24 horas antes."],
  },
  "perfil-lipidico-r-coronario-col-tot-col-hdl-colt-ldl-col-vldl-trig-rel-ldl-hdl-rel-col-hdl": {
    description:
      "Evalúa en conjunto el colesterol total, HDL, LDL, VLDL y triglicéridos, para estimar el riesgo cardiovascular de forma más completa que una sola prueba.",
    muestra: "Sangre venosa",
    requisitos: ["Ayuno de 12 horas.", "Evitar el consumo de alcohol 24 horas antes."],
  },
  "t-g-o-transaminasa-oxalacetica": {
    description: "Enzima hepática (AST/TGO) que ayuda a evaluar el funcionamiento del hígado.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno estricto, aunque se recomienda evitar comidas muy grasas antes."],
  },
  "t-g-p-transaminasa-piruvica": {
    description: "Enzima hepática (ALT/TGP) que ayuda a evaluar el funcionamiento del hígado.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno estricto, aunque se recomienda evitar comidas muy grasas antes."],
  },
  "creatinina-sangre": {
    description:
      "Mide la creatinina en sangre, producto de desecho muscular que filtran los riñones. Es uno de los indicadores principales de la función renal.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  "urea-serica": {
    description: "Mide la urea en sangre, otro indicador de la función renal, junto con la creatinina.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  "acido-urico-serico": {
    description:
      "Mide el ácido úrico en sangre; niveles elevados se relacionan con la gota y otros trastornos metabólicos.",
    muestra: "Sangre venosa",
    requisitos: ["Ayuno de 8 horas recomendado."],
  },
  "factor-reumatoideo": {
    description:
      "Detecta un anticuerpo asociado a artritis reumatoide y otras enfermedades autoinmunes o inflamatorias.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  "proteina-c-reactiva": {
    description: "Marcador de inflamación general en el cuerpo; sube ante infecciones o procesos inflamatorios.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  "pcr-us-proteina-c-reactiva-ultrasensible": {
    description:
      "Versión de mayor sensibilidad de la proteína C reactiva, usada también para estimar riesgo cardiovascular.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  "ferritina-serica": {
    description: "Mide las reservas de hierro en el cuerpo; útil para evaluar anemia por déficit de hierro.",
    muestra: "Sangre venosa",
    requisitos: ["Ayuno de 8 horas recomendado."],
  },
  "vitamina-b12": {
    description: "Mide el nivel de vitamina B12, importante para la formación de glóbulos rojos y el sistema nervioso.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno estricto; confirma con el laboratorio si toma suplementos vitamínicos."],
  },
  "vitamina-d-25-hidroxi": {
    description: "Mide el nivel de vitamina D, relevante para la salud ósea e inmunológica.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno estricto."],
  },
  "grupo-sanguineo-y-factor-rh": {
    description: "Determina el tipo de sangre (A, B, AB u O) y el factor Rh (positivo o negativo).",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  "grupo-sanguineo-y-factor-rh-variante-du": {
    description:
      "Determina el tipo de sangre y factor Rh, incluyendo la variante Du en casos donde el Rh no es claro a simple vista.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  "hemoglobina-glicosilada": {
    description:
      "Refleja el promedio de glucosa en sangre de los últimos 2 a 3 meses. Se usa para el diagnóstico y control de la diabetes.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  tsh: {
    description: "Hormona que regula el funcionamiento de la tiroides; es la primera prueba para evaluar su salud.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno estricto."],
  },
  t3: {
    description: "Una de las hormonas tiroideas; se evalúa junto con TSH y T4 para estudiar la tiroides.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno estricto."],
  },
  "t3-libre": {
    description: "Forma activa de la hormona T3, usada junto con TSH y T4 para evaluar la tiroides.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno estricto."],
  },
  t4: {
    description: "Una de las hormonas tiroideas principales; se evalúa junto con TSH y T3.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno estricto."],
  },
  "t4-libre": {
    description: "Forma activa de la hormona T4, usada junto con TSH y T3 para evaluar la tiroides.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno estricto."],
  },
  "perfil-tiroideo-tsh-t4-lib-t3": {
    description:
      "Evalúa en conjunto TSH, T4 libre y T3 para tener un panorama completo del funcionamiento de la tiroides.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno estricto."],
  },
  "bhcg-varones": {
    description: "Mide la hormona hCG en varones, usada en el estudio de ciertos tumores testiculares, entre otros casos.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  "fraccion-beta-bhcg-sangre": {
    description:
      "Detecta y mide la hormona del embarazo (hCG) en sangre; también se usa en el seguimiento de ciertas condiciones médicas.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  "psa-libre": {
    description: "Mide la fracción libre del antígeno prostático específico, usada junto con el PSA total.",
    muestra: "Sangre venosa",
    requisitos: [
      "Evitar la eyaculación 48 horas antes.",
      "No haberse realizado un tacto rectal reciente antes de la toma de muestra.",
    ],
  },
  "psa-antigeno-prostatico-especifico": {
    description: "Marcador usado principalmente en el control y tamizaje de la salud prostática.",
    muestra: "Sangre venosa",
    requisitos: [
      "Evitar la eyaculación 48 horas antes.",
      "No haberse realizado un tacto rectal reciente antes de la toma de muestra.",
    ],
  },
  "psa-perfil-psa-tot-psa-lib-psa-index": {
    description: "Evalúa en conjunto el PSA total, el PSA libre y su índice, para un estudio más completo de la próstata.",
    muestra: "Sangre venosa",
    requisitos: [
      "Evitar la eyaculación 48 horas antes.",
      "No haberse realizado un tacto rectal reciente antes de la toma de muestra.",
    ],
  },
  "hiv-i-y-ii-ag-p24": {
    description: "Prueba de tamizaje para la detección del VIH (tipos I y II) y el antígeno p24. Resultado confidencial.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  "rpr-serologias-vdrl": {
    description: "Prueba de tamizaje para sífilis.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  "rpr-cuantitativo": {
    description: "Mide el nivel de reactividad de la prueba de sífilis, útil para el seguimiento del tratamiento.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  "hep-b-ag-de-superf-hbsag": {
    description: "Detecta el antígeno de superficie del virus de la hepatitis B, usado para diagnóstico e tamizaje.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  urocultivo: {
    description:
      "Cultivo de orina para detectar bacterias y diagnosticar infecciones urinarias, además de orientar el tratamiento antibiótico.",
    muestra: "Orina (frasco estéril)",
    requisitos: [
      "Recolectar preferentemente la primera orina de la mañana.",
      "Realizar aseo genital previo con agua y jabón.",
      "Usar el frasco estéril entregado por el laboratorio y evitar tocar el interior de la tapa.",
    ],
  },
  "examen-completo-de-orina": {
    description:
      "Analiza características físicas, químicas y microscópicas de la orina; ayuda a detectar infecciones urinarias, problemas renales y otras condiciones.",
    muestra: "Orina",
    requisitos: [
      "Recolectar preferentemente la primera orina de la mañana.",
      "Realizar aseo genital previo con agua y jabón.",
    ],
  },
  "tiempo-de-protrombina-tp-tpt-inr": {
    description:
      "Evalúa la capacidad de coagulación de la sangre. Es clave para el control de personas que toman anticoagulantes.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno.", "Informar al laboratorio si tomas anticoagulantes."],
  },
  "velocidad-de-sedimentacion-2-horas": {
    description: "Marcador general de inflamación en el cuerpo, útil en el seguimiento de distintas enfermedades.",
    muestra: "Sangre venosa",
    requisitos: ["No requiere ayuno."],
  },
  "creatinina-post-dialisis": {
    description: "Mide la creatinina después de una sesión de diálisis, para evaluar su efectividad.",
    muestra: "Sangre venosa",
    requisitos: ["Coordinar el horario de la toma de muestra con tu centro de diálisis."],
  },
  "creatinina-post-hidratacion": {
    description: "Mide la creatinina después de un proceso de hidratación, según indicación médica.",
    muestra: "Sangre venosa",
    requisitos: ["Seguir la indicación de tu médico sobre el momento exacto de la toma de muestra."],
  },
  "urea-predialisis": {
    description: "Mide la urea antes de una sesión de diálisis, para evaluar la necesidad y eficacia del tratamiento.",
    muestra: "Sangre venosa",
    requisitos: ["Coordinar el horario de la toma de muestra con tu centro de diálisis."],
  },
};