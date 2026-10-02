import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ClipboardList, Droplet, Info, MapPin, ScanLine, Sparkles, Waves, Zap, type LucideIcon } from "lucide-react";
import { labServices, serviceCategories, type ServiceCategorySlug } from "@/config/services";
import { examDetails } from "@/config/examDetails";
import { innovations } from "@/config/innovations";
import { ExamDetailActions } from "@/components/servicios/ExamDetailActions";
import { BackButton } from "@/components/ui/BackButton";
import { sedeExclusivaTexto } from "@/lib/sedeDisponibilidad";

const categoryLabel: Record<ServiceCategorySlug, string> = Object.fromEntries(
  serviceCategories.map((c) => [c.slug, c.label])
) as Record<ServiceCategorySlug, string>;

// Mismo ícono por novedad que en Innovations.tsx / InnovationsBanner.tsx /
// ServiciosPromoModal.tsx (ecógrafo, rayos X, química e inmunobioquímica).
const promoIconById: Record<string, LucideIcon> = {
  ecografo: Waves,
  rayosx: ScanLine,
  quimica: Zap,
};

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = labServices.find((s) => s.id === id);
  return {
    title: service ? `${service.name} | Laboratorios Muñoz` : "Análisis | Laboratorios Muñoz",
  };
}

export default async function ExamDetailPage({ params }: Props) {
  const { id } = await params;
  const service = labServices.find((s) => s.id === id);
  if (!service) notFound();

  const detail = examDetails[service.id];
  const notaSede = sedeExclusivaTexto(service);
  // Las 3 novedades (ecógrafo, rayos X, química e inmunobioquímica) tienen
  // foto propia y se presentan con un diseño especial: imagen a la
  // izquierda, texto a la derecha. El resto del catálogo (495 análisis) no
  // tiene fotos individuales, así que sigue con la ficha simple de siempre.
  const promo = innovations.find((i) => i.serviceId === service.id);

  const fichaDetalle = detail ? (
    <>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-munoz-blue/10 text-munoz-blue">
          <Info size={17} aria-hidden />
        </span>
        <div>
          <h2 className="font-bold text-munoz-navy">¿Qué evalúa?</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-munoz-navy/65">{detail.description}</p>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-munoz-green/10 text-munoz-green">
          <Droplet size={17} aria-hidden />
        </span>
        <div>
          <h2 className="font-bold text-munoz-navy">Tipo de muestra</h2>
          <p className="mt-1.5 text-sm text-munoz-navy/65">{detail.muestra}</p>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-munoz-blue/10 text-munoz-blue">
          <ClipboardList size={17} aria-hidden />
        </span>
        <div>
          <h2 className="font-bold text-munoz-navy">Requisitos previos</h2>
          <ul className="mt-1.5 space-y-1.5 text-sm text-munoz-navy/65">
            {detail.requisitos.map((r) => (
              <li key={r} className="flex gap-2">
                <span aria-hidden className="text-munoz-green">•</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 text-xs text-munoz-navy/40">
        Información general de referencia. Confirma cualquier indicación especial con tu médico o con el
        laboratorio antes de la toma de muestra.
      </p>
    </>
  ) : (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-munoz-navy/10 text-munoz-navy/50">
        <Info size={17} aria-hidden />
      </span>
      <div>
        <p className="font-semibold text-munoz-navy">Aún no tenemos la ficha completa de este análisis.</p>
        <p className="mt-1.5 text-sm text-munoz-navy/60">
          Puedes agregarlo igual a tu carrito y consultarnos los detalles por WhatsApp al agendar, o
          comunicarte directamente con nosotros para más información.
        </p>
      </div>
    </div>
  );

  // ---- Diseño especial: foto a la izquierda, texto a la derecha ----
  if (promo) {
    const Icon = promoIconById[promo.id] ?? Sparkles;
    return (
      <section className="relative mx-auto max-w-5xl overflow-hidden px-5 py-12 lg:px-10">
        {/* Blobs decorativos flotando muy lento de fondo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-28 -top-20 h-80 w-80 rounded-full bg-munoz-aqua/25 blur-3xl animate-float-slow"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-munoz-green/15 blur-3xl animate-float-slower"
        />

        <div className="relative mb-6">
          <BackButton />
        </div>

        <div className="relative grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-14">
          {/* Imagen, a la izquierda */}
          <div className="text-swap group relative lg:sticky lg:top-28">
            {/* Anillo de luz girando detrás de la foto */}
            <div
              aria-hidden
              className="absolute -inset-2.5 rounded-[2rem] bg-linear-to-tr from-munoz-blue via-munoz-aqua to-munoz-green opacity-25 blur-xl animate-spin-slow"
            />
            <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] shadow-xl shadow-munoz-navy/15 ring-1 ring-white/60">
              <Image
                src={promo.image}
                alt={promo.alt}
                fill
                priority
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-munoz-navy/55 via-transparent to-transparent" />
              {/* Destello que cruza la foto al pasar el mouse */}
              <div
                aria-hidden
                className="absolute inset-0 -translate-x-[120%] skew-x-12 bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]"
              />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-munoz-green shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-munoz-green/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-munoz-green" />
                </span>
                Nuevo
              </span>
              <span className="animate-pulse-ring absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1">
                <Icon size={19} aria-hidden />
              </span>
            </div>
          </div>

          {/* Texto, a la derecha — entra en cascada */}
          <div>
            <span className="text-swap inline-block rounded-full bg-munoz-blue/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-munoz-blue">
              {categoryLabel[service.category]}
            </span>
            <h1
              style={{ animationDelay: "90ms" }}
              className="text-swap mt-4 text-2xl font-bold leading-tight text-munoz-navy sm:text-3xl"
            >
              {promo.title}
            </h1>
            <p
              style={{ animationDelay: "170ms" }}
              className="text-swap mt-3.5 text-[15px] leading-relaxed text-munoz-navy/60"
            >
              {promo.description}
            </p>

            <div
              style={{ animationDelay: "240ms" }}
              className="text-swap mt-7 border-t border-munoz-navy/10 pt-7"
            >
              {fichaDetalle}
            </div>

            <div style={{ animationDelay: "310ms" }} className="text-swap mt-8">
              <ExamDetailActions service={service} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---- Ficha simple de siempre, para el resto del catálogo ----
  return (
    <section className="mx-auto max-w-3xl px-5 py-12 lg:px-10">
      <div className="mb-6">
        <BackButton />
      </div>

      <span className="inline-block rounded-full bg-munoz-blue/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-munoz-blue">
        {categoryLabel[service.category]}
      </span>
      <h1 className="mt-4 text-3xl font-bold text-munoz-navy sm:text-4xl">{service.name}</h1>

      {notaSede && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-munoz-green/30 bg-munoz-green/8 px-4 py-2 text-sm font-semibold text-munoz-green">
          <MapPin size={15} aria-hidden /> {notaSede}
        </p>
      )}

      <div className="mt-8 rounded-2xl border border-munoz-navy/10 bg-white p-6 shadow-sm sm:p-8">{fichaDetalle}</div>

      <div className="mt-8">
        <ExamDetailActions service={service} />
      </div>
    </section>
  );
}