"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import siteData from "@/data/hair-atelier.json";

const data = siteData.gallery;
const rowGrid = ["sm:grid-cols-4", "sm:grid-cols-5"];

type GalleryImage = { src: string; alt: string };

function Arrow({ direction, className = "h-4 w-4" }: { direction: "left" | "right"; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "left" ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"} />
    </svg>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onChange,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const image = images[index];
  const prev = useCallback(() => onChange((index - 1 + images.length) % images.length), [index, images.length, onChange]);
  const next = useCallback(() => onChange((index + 1) % images.length), [index, images.length, onChange]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#e0a458] text-white transition hover:bg-[#e0a458] hover:text-black"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#e0a458] bg-black/50 text-white transition hover:bg-[#e0a458] hover:text-black sm:left-6"
      >
        <Arrow direction="left" className="h-5 w-5" />
      </button>

      <motion.figure
        className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative aspect-[4/3] w-full max-h-[78vh] overflow-hidden rounded-xl border border-[#e0a458]/60">
          <AnimatePresence initial={false}>
            <motion.div
              key={image.src}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.figure>

      <button
        type="button"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#e0a458] bg-black/50 text-white transition hover:bg-[#e0a458] hover:text-black sm:right-6"
      >
        <Arrow direction="right" className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

export default function GallerySection() {
  const { eyebrow, titleLine1, titleLine2, description, rows } = data;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allImages = rows.flat();

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const changeLightbox = useCallback((index: number) => setLightboxIndex(index), []);

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
            {eyebrow}
          </span>

          <h2 className="mt-6 font-heading text-4xl leading-tight font-semibold sm:text-5xl">
            <span className="text-white">{titleLine1} </span>
            <span className="bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text pr-1 italic text-transparent">
              {titleLine2}
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm text-white/80 sm:text-base">{description}</p>
        </Reveal>

        <div className="mt-12 space-y-4">
          {rows.map((row, rowIndex) => (
            <Stagger key={rowIndex} stagger={0.08} className={`grid grid-cols-2 gap-4 ${rowGrid[rowIndex % rowGrid.length]}`}>
              {row.map((image) => {
                const globalIndex = allImages.findIndex((img) => img.src === image.src);
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
          <Lightbox images={allImages} index={lightboxIndex} onClose={closeLightbox} onChange={changeLightbox} />
        )}
      </AnimatePresence>
    </section>
  );
}
