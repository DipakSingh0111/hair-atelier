"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { EnquiryFormContent } from "@/types/hair-atelier.types";

type EnquiryFormProps = {
  content: EnquiryFormContent;
  withDate?: boolean;
  messageRequired?: boolean;
  redirectTo?: string;
  className?: string;
};

type Values = { name: string; phone: string; email: string; date: string; service: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const initialValues: Values = { name: "", phone: "", email: "", date: "", service: "", message: "" };

const fieldIcons: Record<string, ReactNode> = {
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" />
    </>
  ),
  note: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6M8 13h8M8 17h5" />
    </>
  ),
};

function FieldIcon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`pointer-events-none absolute left-4 h-4 w-4 text-[#e0a458] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {fieldIcons[name]}
    </svg>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1.5 text-xs text-red-400">{message}</p> : null;
}

const inputClass =
  "w-full rounded-lg border bg-white/[0.04] py-3.5 pr-4 pl-11 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-[#e0a458] focus:bg-white/[0.06]";

export default function EnquiryForm({
  content,
  withDate = false,
  messageRequired = false,
  redirectTo = "/thank-you",
  className = "",
}: EnquiryFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [dateFocused, setDateFocused] = useState(false);

  const validate = (): Errors => {
    const found: Errors = {};
    if (!values.name.trim()) found.name = content.errors.name;
    if (!/^\+?[\d\s-]{8,15}$/.test(values.phone.trim())) found.phone = content.errors.phone;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) found.email = content.errors.email;
    if (!values.service) found.service = content.errors.service;
    if (messageRequired && !values.message.trim()) found.message = content.errors.message;
    return found;
  };

  const update = (field: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const border = (field: keyof Values) => (errors[field] ? "border-red-400/70" : "border-white/10");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    router.push(redirectTo);
  };

  const emailField = (
    <div>
      <label className="relative flex items-center">
        <span className="sr-only">{content.fields.email}</span>
        <FieldIcon name="mail" />
        <input
          type="email"
          autoComplete="email"
          placeholder={content.fields.email}
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={!!errors.email}
          className={`${inputClass} ${border("email")}`}
        />
      </label>
      <FieldError message={errors.email} />
    </div>
  );

  return (
    <form noValidate onSubmit={onSubmit} className={`space-y-4 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="relative flex items-center">
            <span className="sr-only">{content.fields.name}</span>
            <FieldIcon name="user" />
            <input
              type="text"
              autoComplete="name"
              placeholder={content.fields.name}
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={!!errors.name}
              className={`${inputClass} ${border("name")}`}
            />
          </label>
          <FieldError message={errors.name} />
        </div>

        <div>
          <label className="relative flex items-center">
            <span className="sr-only">{content.fields.phone}</span>
            <FieldIcon name="user" />
            <input
              type="tel"
              autoComplete="tel"
              placeholder={content.fields.phone}
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={!!errors.phone}
              className={`${inputClass} ${border("phone")}`}
            />
          </label>
          <FieldError message={errors.phone} />
        </div>

        {withDate && (
          <>
            {emailField}
            <label className="relative flex items-center">
              <span className="sr-only">{content.fields.date}</span>
              <FieldIcon name="calendar" />
              <input
                type={dateFocused || values.date ? "date" : "text"}
                placeholder={content.fields.date}
                value={values.date}
                onFocus={() => setDateFocused(true)}
                onBlur={() => setDateFocused(false)}
                onChange={(e) => update("date", e.target.value)}
                className={`${inputClass} ${border("date")} [color-scheme:dark]`}
              />
            </label>
          </>
        )}
      </div>

      {!withDate && emailField}

      <div>
        <label className="relative flex items-center">
          <span className="sr-only">{content.fields.service}</span>
          <FieldIcon name="scissors" />
          <select
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            aria-invalid={!!errors.service}
            className={`${inputClass} ${border("service")} appearance-none pr-10 ${values.service ? "text-white" : "text-white/50"}`}
          >
            <option value="" disabled>
              {content.fields.service}
            </option>
            {content.services.map((service) => (
              <option key={service} value={service} className="bg-[#141414] text-white">
                {service}
              </option>
            ))}
          </select>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute right-4 h-4 w-4 text-white/60" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </label>
        <FieldError message={errors.service} />
      </div>

      <div>
        <label className="relative flex">
          <span className="sr-only">{content.fields.message}</span>
          <FieldIcon name="note" className="top-4" />
          <textarea
            rows={5}
            placeholder={content.fields.message}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={!!errors.message}
            className={`${inputClass} ${border("message")} resize-y`}
          />
        </label>
        <FieldError message={errors.message} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f0b866] via-[#f5c27a] to-[#e8a850] py-3.5 text-sm font-semibold text-black shadow-[0_0_25px_-8px_rgba(240,184,102,0.7)] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? content.submittingLabel : content.submitLabel}
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>

      {content.privacyNote && (
        <p className="flex items-start justify-center gap-2 px-4 text-center text-xs leading-relaxed text-white/65">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#e0a458]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          {content.privacyNote}
        </p>
      )}
    </form>
  );
}
