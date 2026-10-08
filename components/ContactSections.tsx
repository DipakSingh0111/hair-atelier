import type { ReactNode } from "react";
import Image from "next/image";
import EnquiryForm from "@/components/EnquiryForm";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import type { ContactPageData } from "@/types/hair-atelier.types";

const icons: Record<string, ReactNode> = {
  location: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  phone: (
    <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
};

const goldText =
  "bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text text-transparent";

function Eyebrow({
  children,
  center = false,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 ${center ? "justify-center" : ""}`}
    >
      {center && <span className="h-px w-10 bg-[#e0a458]" />}
      <p className="text-xs font-semibold tracking-[0.25em] text-[#e0a458] uppercase">
        {children}
      </p>
      <span className="h-px w-10 bg-[#e0a458]" />
    </div>
  );
}

export function ContactInfoCards({ data: infoCards }: { data: ContactPageData["infoCards"] }) {
  return (
    <section className="border-b border-white/5 bg-black py-12">
      <Stagger
        immediate
        delay={0.3}
        className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10"
      >
        {infoCards.map((card) => {
          const body = (
            <>
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e0a458] text-[#e0a458] transition group-hover:bg-[#e0a458] group-hover:text-black">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icons[card.icon]}
                </svg>
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                {card.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-white/80">
                {card.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </>
          );
          const cardClass =
            "group flex h-full flex-col items-center rounded-xl border border-[#e0a458]/50 bg-gradient-to-br from-[#16110b] via-black to-black px-5 py-7 text-center transition duration-300 hover:-translate-y-1 hover:border-[#e0a458] hover:shadow-[0_0_30px_-10px_rgba(224,164,88,0.55)]";
          return (
            <StaggerItem key={card.title} distance={40}>
              {card.href ? (
                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    card.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={cardClass}
                >
                  {body}
                </a>
              ) : (
                <div className={cardClass}>{body}</div>
              )}
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

export function ContactFormSection({ data: form }: { data: ContactPageData["form"] }) {
  const { badge, heading, description, image } = form;

  return (
    <section className="bg-black py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-6 lg:grid-cols-2 lg:gap-12 lg:px-10">
        <Stagger>
          <StaggerItem direction="right">
            <Eyebrow>{badge}</Eyebrow>
          </StaggerItem>
          <StaggerItem
            as="h2"
            direction="right"
            className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl"
          >
            {heading.main} <span className={goldText}>{heading.highlight}</span>
          </StaggerItem>
          <StaggerItem
            as="p"
            direction="right"
            className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base"
          >
            {description}
          </StaggerItem>
          <StaggerItem>
            <EnquiryForm content={form} messageRequired className="mt-8" />
          </StaggerItem>
        </Stagger>

        <Reveal
          direction="left"
          distance={60}
          delay={0.2}
          className="relative min-h-80 overflow-hidden rounded-2xl border border-[#e0a458]/60 shadow-[0_0_40px_-15px_rgba(224,164,88,0.5)]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition duration-700 hover:scale-105"
          />
        </Reveal>
      </div>
    </section>
  );
}

export function ContactMapSection({ data: map }: { data: ContactPageData["map"] }) {
  return (
    <section className="bg-black pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center">
          <Eyebrow center>{map.badge}</Eyebrow>
          <h2 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl">
            {map.heading.main} <span className={goldText}>{map.heading.highlight}</span>
          </h2>
        </Reveal>

        <Reveal
          direction="none"
          scale={0.95}
          delay={0.15}
          className="mt-10 overflow-hidden rounded-2xl border border-[#e0a458]/60 shadow-[0_0_40px_-15px_rgba(224,164,88,0.5)]"
        >
          <iframe
            src={map.embedUrl}
            title={map.title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-80 w-full border-0 [filter:invert(90%)_hue-rotate(180deg)_grayscale(40%)_contrast(90%)] sm:h-96"
          />
        </Reveal>
      </div>
    </section>
  );
}
