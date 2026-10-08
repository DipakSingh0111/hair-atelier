import type { ReactNode } from "react";
import Image from "next/image";
import EnquiryForm from "@/components/EnquiryForm";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import type { QuotePageData } from "@/types/hair-atelier.types";

const icons: Record<string, ReactNode> = {
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" />
    </>
  ),
  diamond: (
    <>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20M12 21 8 9l4-6 4 6z" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 20c-3-2-4.5-5-4.5-8.5C7.5 8 12 4 12 4s4.5 4 4.5 7.5C16.5 15 15 18 12 20z" />
      <path d="M12 20c-4 0-8-2.5-9-7 3 0 5 1 6.5 2.5M12 20c4 0 8-2.5 9-7-3 0-5 1-6.5 2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
};

export default function QuoteSection({ data }: { data: QuotePageData }) {
  const { background, intro, form } = data;

  return (
    <section className="relative overflow-hidden bg-black py-8 lg:py-10">
      <Image
        src={background.src}
        alt={background.alt}
        fill
        sizes="100vw"
        className="object-cover object-left opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/85 to-black" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:px-10">
        <Stagger>
          <StaggerItem
            as="h2"
            direction="right"
            className="font-heading text-4xl leading-tight font-semibold text-white sm:text-5xl"
          >
            <span className="block">{intro.heading.main}</span>
            <span className="block">
              {intro.heading.middle}{" "}
              <span className="bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text text-transparent">
                {intro.heading.highlight}
              </span>
            </span>
          </StaggerItem>

          <ul className="mt-10 space-y-8">
            {intro.list.map((feature) => (
              <StaggerItem
                as="li"
                direction="right"
                key={feature.title}
                className="group flex items-start gap-6"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#e0a458] text-[#e0a458] transition group-hover:bg-[#e0a458] group-hover:text-black">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icons[feature.icon]}
                  </svg>
                </span>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 max-w-sm text-[15px] leading-relaxed text-white/80">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </ul>
        </Stagger>

        <Reveal
          direction="left"
          distance={60}
          delay={0.2}
          className="rounded-2xl border border-[#e0a458]/60 bg-[#0d0c0b]/90 p-6 shadow-[0_0_40px_-15px_rgba(224,164,88,0.5)] backdrop-blur-sm sm:p-8"
        >
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            {form.heading.main}{" "}
            <span className="bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text text-transparent">
              {form.heading.highlight}
            </span>
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
            {form.description}
          </p>
          <EnquiryForm content={form} withDate className="mt-7" />
        </Reveal>
      </div>
    </section>
  );
}
