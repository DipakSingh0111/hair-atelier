"use client";

import { Fragment, type ReactNode, useState, useCallback } from "react";
import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import Lightbox from "@/components/Lightbox";
import { AnimatePresence } from "framer-motion";
import type { ServiceDetail } from "@/types/hair-atelier.types";

const icons: Record<string, ReactNode> = {
  scissors: (
    <>
      <circle cx="7" cy="18" r="3" />
      <circle cx="17" cy="18" r="3" />
      <path d="M8.7 15.5 17.5 3M15.3 15.5 6.5 3" />
      <circle cx="12" cy="10" r="0.6" fill="currentColor" />
    </>
  ),
  diamond: (
    <>
      <path d="M6 4h12l4 5-10 12L2 9z" />
      <path d="M2 9h20M10 4 8 9l4 12 4-12-2-5M8 9l-2-5M16 9l2-5" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 4c-1.8 2.2-2.8 4.6-2.8 7.2 0 2.7 1.2 5.2 2.8 6.8 1.6-1.6 2.8-4.1 2.8-6.8C14.8 8.6 13.8 6.2 12 4z" />
      <path d="M9.6 8.6C7.6 8 5.6 8.2 4.5 8.8c.1 4.6 3 8.4 7.5 9.2M14.4 8.6c2-.6 4-.4 5.1.2-.1 4.6-3 8.4-7.5 9.2" />
      <path d="M4.6 12.2C3.4 12.4 2.5 12.8 2 13.3 3 16.4 6.5 18.5 12 18.5s9-2.1 10-5.2c-.5-.5-1.4-.9-2.6-1.1" />
      <path d="M8 21h8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  chat: (
    <>
      <path d="M16.5 7.6A6.5 6.5 0 0 1 21 16l1 3.4-3.4-1a6.5 6.5 0 0 1-6.9-.8" />
      <path d="M15 10.5a6.5 6.5 0 0 1-9.6 5.7L2 17.3l1.1-3.4A6.5 6.5 0 1 1 15 10.5z" />
      <path d="M5.8 10.5h.01M8.5 10.5h.01M11.2 10.5h.01" strokeWidth={2.2} />
    </>
  ),
  dryer: (
    <>
      <path d="M14 3a5 5 0 0 1 0 10h-3.5l-1 8H6.5l.9-8.2A2.5 2.5 0 0 1 5 10.3V5.5A2.5 2.5 0 0 1 7.5 3z" />
      <circle cx="14" cy="8" r="2" />
      <path d="M5 6.5H3M5 9.5H3" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 13.5a4.5 4.5 0 0 0 8 0" />
      <path d="M9 9.5h.01M15 9.5h.01" strokeWidth={2.4} />
    </>
  ),
  sparkles: (
    <>
      <path d="M10 3c.6 3.9 2.6 5.9 6.5 6.5-3.9.6-5.9 2.6-6.5 6.5-.6-3.9-2.6-5.9-6.5-6.5C7.4 8.9 9.4 6.9 10 3z" />
      <path d="M18 14c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3z" />
    </>
  ),
  drop: (
    <>
      <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z" />
      <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 0 0 0 18c1.1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.8-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8z" />
      <circle cx="7.5" cy="11" r="1" />
      <circle cx="10" cy="7" r="1" />
      <circle cx="14.5" cy="7" r="1" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  face: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10h.01M15 10h.01M9.5 15c1.5 1 3.5 1 5 0" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c0 9-5 15-12 15a5 5 0 0 1-4-2C4 9 11 4 20 4z" />
      <path d="M4 20c3-5 7-8 11-10" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </>
  ),
};

function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
}

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
      <p className="text-xs font-semibold tracking-[0.25em] text-[#e0a458] uppercase">
        {children}
      </p>
      <span className="h-px w-10 bg-[#e0a458]" />
    </div>
  );
}

const goldText =
  "bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text text-transparent";

type ServiceDetailsProps = {
  service: ServiceDetail;
  overviewBadge: string;
  processBadge: string;
};

export default function ServiceDetails({ service, overviewBadge, processBadge }: ServiceDetailsProps) {
  const { overview, process } = service;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const changeLightbox = useCallback(
    (index: number) => setLightboxIndex(index),
    [],
  );

  return (
    <>
      <section className="bg-black py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_1.1fr] lg:px-10">
          <Reveal
            direction="right"
            distance={60}
            className="relative mx-auto w-full max-w-lg pt-4 pr-14 pb-10 pl-4 sm:pr-24"
          >
            <Reveal
              direction="right"
              distance={30}
              delay={0.3}
              className="absolute top-8 bottom-16 left-0 w-1/2 rounded-l-xl border-y border-l border-[#e0a458]/70"
            />
            <div className="relative overflow-hidden rounded-xl border border-[#e0a458]/70">
              <Image
                src={overview.images.main.src}
                alt={overview.images.main.alt}
                width={900}
                height={1000}
                preload
                sizes="(min-width: 1024px) 480px, 100vw"
                className="aspect-[9/10] h-auto w-full object-cover"
              />
            </div>
            <Reveal
              delay={0.35}
              distance={50}
              className="absolute right-0 bottom-0 w-[45%] overflow-hidden rounded-xl border-2 border-[#e0a458]/80 shadow-2xl"
            >
              <Image
                src={overview.images.secondary.src}
                alt={overview.images.secondary.alt}
                width={600}
                height={700}
                sizes="(min-width: 1024px) 220px, 45vw"
                className="aspect-[6/7] h-auto w-full object-cover"
              />
            </Reveal>
          </Reveal>

          <Stagger>
            <StaggerItem direction="left">
              <Eyebrow>{overviewBadge}</Eyebrow>
            </StaggerItem>
            <StaggerItem
              as="h2"
              direction="left"
              className="mt-4 font-heading text-4xl leading-tight font-semibold text-white sm:text-5xl"
            >
              <span className="block">{overview.heading.main}</span>
              <span className="block">
                {overview.heading.middle}{" "}
                <span className={goldText}>{overview.heading.highlight}</span>
              </span>
            </StaggerItem>
            <StaggerItem
              as="p"
              direction="left"
              className="mt-5 text-[15px] leading-relaxed text-white/80"
            >
              {overview.description}
            </StaggerItem>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {overview.highlights.map((item) => (
                <StaggerItem key={item.title} scale={0.9} distance={20}>
                  <div className="group flex h-full items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#e0a458]/70">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e0a458] text-[#e0a458] transition group-hover:bg-[#e0a458] group-hover:text-black">
                      <Icon name={item.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-heading font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-white/65">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      <section className="bg-black pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="text-center">
            <Eyebrow center>{processBadge}</Eyebrow>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-5xl">
              {process.heading.main}{" "}
              <span className={goldText}>{process.heading.highlight}</span>
            </h2>
          </Reveal>

          <Stagger
            as="ol"
            stagger={0.15}
            className="mt-12 grid grid-cols-2 gap-4 sm:gap-10 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:gap-4"
          >
            {process.steps.map((step, i) => (
              <Fragment key={step.title}>
                {i > 0 && (
                  <StaggerItem
                    as="li"
                    direction="right"
                    distance={20}
                    className="hidden items-start pt-5 text-[#e0a458] lg:flex"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-6 w-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12h19M16 7l5 5-5 5" />
                    </svg>
                  </StaggerItem>
                )}
                <StaggerItem
                  as="li"
                  className="group flex flex-col items-center text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#e0a458] text-[#e0a458] transition group-hover:bg-[#e0a458] group-hover:text-black">
                    <Icon name={step.icon} className="h-7 w-7" />
                  </span>
                  <span className="mt-3 font-heading text-2xl font-bold text-[#e0a458]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-white/75">
                    {step.description}
                  </p>
                </StaggerItem>
              </Fragment>
            ))}
          </Stagger>

          <Stagger
            stagger={0.1}
            className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4"
          >
            {process.images.map((image, index) => (
              <StaggerItem key={image.src} scale={0.88} distance={20}>
                <button
                  type="button"
                  aria-label={`Open image`}
                  onClick={() => setLightboxIndex(index)}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg border border-[#e0a458]/60 shadow-[0_0_20px_-10px_rgba(224,164,88,0.5)] transition lg:hover:border-[#e0a458]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition duration-700 lg:group-hover:scale-110"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition duration-300 lg:group-hover:opacity-100">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e0a458] bg-black/40 text-[#e0a458]">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
                      </svg>
                    </span>
                  </span>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={process.images}
            index={lightboxIndex}
            onClose={closeLightbox}
            onChange={changeLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
}
