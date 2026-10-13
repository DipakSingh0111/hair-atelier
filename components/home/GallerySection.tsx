"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import Lightbox from "@/components/common/Lightbox";
import type { GalleryData } from "@/types/hair-atelier.types";

const rowGrid = ["sm:grid-cols-4", "sm:grid-cols-5"];

export default function GallerySection({ data }: { data: GalleryData }) {
  const { badge, heading, description, rows } = data;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allImages = rows.flat();

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const changeLightbox = useCallback(
    (index: number) => setLightboxIndex(index),
    [],
  );

  return (
    <section className="bg-black py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#e0a458] px-5 py-2 text-xs font-semibold tracking-[0.2em] text-[#e0a458] uppercase">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="1.5" />
              <path d="m21 16-5-5-9 9" />
            </svg>
            {badge}
          </span>

          <h2 className="mt-6 font-heading text-4xl leading-tight font-semibold sm:text-5xl">
            <span className="text-white">{heading.main} </span>
            <span className="bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text pr-1 italic text-transparent">
              {heading.highlight}
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm text-white/80 sm:text-base">
            {description}
          </p>
        </Reveal>

        <div className="mt-12 space-y-4">
          {rows.map((row, rowIndex) => (
            <Stagger
              key={rowIndex}
              stagger={0.08}
              className={`grid grid-cols-2 gap-4 ${rowGrid[rowIndex % rowGrid.length]}`}
            >
              {row.map((image) => {
                const globalIndex = allImages.findIndex(
                  (img) => img.src === image.src,
                );
                return (
                  <StaggerItem key={image.src} scale={0.85} distance={20}>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(globalIndex)}
                      aria-label={`Open ${image.alt}`}
                      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg border border-[#e0a458]/50 shadow-[0_0_20px_-10px_rgba(224,164,88,0.5)] transition lg:hover:border-[#e0a458] focus-visible:outline-2 focus-visible:outline-[#e0a458] sm:aspect-auto sm:h-44 lg:h-56"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover transition duration-700 lg:group-hover:scale-110"
                      />
                      <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 text-sm font-medium text-white opacity-0 transition duration-300 lg:group-hover:opacity-100">
                        {image.alt}
                      </span>
                    </button>
                  </StaggerItem>
                );
              })}
            </Stagger>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={allImages}
            index={lightboxIndex}
            onClose={closeLightbox}
            onChange={changeLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
