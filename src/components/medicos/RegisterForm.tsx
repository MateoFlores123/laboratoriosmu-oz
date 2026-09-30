"use client";

import Image from "next/image";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  CheckCircle2,
  User,
  BadgeCheck,
  Building2,
  Stethoscope,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { CircuitBackground } from "./CircuitBackground";

function Field({
  icon,
  label,
  htmlFor,
  children,
}: {
  icon: ReactNode;
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-munoz-navy">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-munoz-blue/60">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}

const fieldClass =
  "w-full rounded-full border border-munoz-navy/12 bg-munoz-mist/60 py-3 pl-11 pr-4 text-sm text-munoz-navy placeholder:text-munoz-navy/35 transition-colors focus:border-munoz-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-munoz-blue/15";

export function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);

  // TODO(backend): reemplazar por POST a /api/medicos/registro con estos datos
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="registro" className="mx-auto max-w-[90rem] scroll-mt-24 px-5 py-16 lg:px-10">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-munoz-navy/10 ring-1 ring-munoz-navy/5">
        {/* barra de acento superior */}
        <div className="h-1.5 w-full bg-linear-to-r from-munoz-blue via-munoz-aqua to-munoz-green" />

        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          {/* Formulario */}
          <div className="relative overflow-hidden p-8 sm:p-10 lg:p-12">
            <CircuitBackground className="text-munoz-navy/[0.035]" />

            <div className="relative animate-fade-up">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-munoz-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-munoz-green">
                Únete en minutos
              </span>
              <h2 className="mt-4 text-2xl font-extrabold text-munoz-navy sm:text-3xl">
                Regístrate como médico aliado
              </h2>
              <p className="mt-2 text-sm text-munoz-navy/55">
                Completa tus datos y nuestro equipo te contactará en breve.
              </p>

              {submitted ? (
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-munoz-green/30 bg-munoz-green/5 p-5">
                  <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-munoz-green" aria-hidden />
                  <div>
                    <p className="font-semibold text-munoz-navy">¡Gracias por registrarte!</p>
                    <p className="mt-1 text-sm text-munoz-navy/60">
                      Nuestro equipo revisará tus datos y se pondrá en contacto contigo pronto.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field icon={<User size={16} aria-hidden />} label="Nombres" htmlFor="nombres">
                      <input id="nombres" name="nombres" type="text" required className={fieldClass} />
                    </Field>
                    <Field icon={<User size={16} aria-hidden />} label="Apellidos" htmlFor="apellidos">
                      <input id="apellidos" name="apellidos" type="text" required className={fieldClass} />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field icon={<BadgeCheck size={16} aria-hidden />} label="N.º de colegiatura" htmlFor="colegiatura">
                      <input
                        id="colegiatura"
                        name="colegiatura"
                        type="text"
                        placeholder="CMP / RNE"
                        required
                        className={fieldClass}
                      />
                    </Field>
                    <Field icon={<Building2 size={16} aria-hidden />} label="Centro de atención" htmlFor="centro">
                      <input
                        id="centro"
                        name="centro"
                        type="text"
                        placeholder="Clínica, hospital o consultorio"
                        className={fieldClass}
                      />
                    </Field>
                  </div>

                  <Field icon={<Stethoscope size={16} aria-hidden />} label="Especialidad" htmlFor="especialidad">
                    <input
                      id="especialidad"
                      name="especialidad"
                      type="text"
                      placeholder="Escribe tu especialidad"
                      required
                      className={fieldClass}
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field icon={<Mail size={16} aria-hidden />} label="Correo electrónico" htmlFor="email">
                      <input id="email" name="email" type="email" required className={fieldClass} />
                    </Field>
                    <Field icon={<Phone size={16} aria-hidden />} label="WhatsApp" htmlFor="whatsapp">
                      <input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        placeholder="+51 9xx xxx xxx"
                        required
                        className={fieldClass}
                      />
                    </Field>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-munoz-navy px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-munoz-navy/20 transition-transform hover:-translate-y-0.5 hover:bg-munoz-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-munoz-blue"
                  >
                    Enviar registro
                    <Send size={15} aria-hidden />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Foto */}
          <div className="relative hidden min-h-[540px] lg:block">
            {/* TODO: reemplazar por una foto real de un médico o del laboratorio */}
            <Image
              src="/medicos/registro.jpg"
              alt="Médico revisando un informe de laboratorio"
              fill
              sizes="45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-munoz-navy/50 via-munoz-navy/5 to-transparent" />

            {/* insignia flotante */}
            <div className="animate-fade-up absolute bottom-7 left-7 right-7 flex items-center gap-3 rounded-2xl bg-white/95 px-5 py-4 shadow-xl backdrop-blur-sm">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-munoz-green/10 text-munoz-green">
                <CheckCircle2 size={20} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold text-munoz-navy">Portal médico digital</p>
                <p className="text-xs text-munoz-navy/55">Resultados e informes en un solo lugar.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}