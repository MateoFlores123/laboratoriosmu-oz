import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClipboardList, Droplet, Info } from "lucide-react";
import { labServices, serviceCategories, type ServiceCategorySlug } from "@/config/services";
import { examDetails } from "@/config/examDetails";
import { ExamDetailActions } from "@/components/servicios/ExamDetailActions";
import { BackButton } from "@/components/ui/BackButton";

const categoryLabel: Record<ServiceCategorySlug, string> = Object.fromEntries(
  serviceCategories.map((c) => [c.slug, c.label])
) as Record<ServiceCategorySlug, string>;

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

  return (
    <section className="mx-auto max-w-3xl px-5 py-12 lg:px-10">
      <div className="mb-6">
        <BackButton />
      </div>

      <span className="inline-block rounded-full bg-munoz-blue/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-munoz-blue">
        {categoryLabel[service.category]}
      </span>
      <h1 className="mt-4 text-3xl font-bold text-munoz-navy sm:text-4xl">{service.name}</h1>

      <div className="mt-8 rounded-2xl border border-munoz-navy/10 bg-white p-6 shadow-sm sm:p-8">
        {detail ? (
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
        )}
      </div>

      <div className="mt-8">
        <ExamDetailActions service={service} />
      </div>
    </section>
  );
}