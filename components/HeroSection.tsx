"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import siteData from "@/data/hair-atelier.json";
const hero = siteData.hero;

const textContainer: Variants = {
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.35 } },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const lineGrow: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
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
      <path d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

export default function HeroSection() {
  const { slides, autoplayInterval } = hero;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => setCurrent((index + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => goTo(current + 1), autoplayInterval);
    return () => clearInterval(timer);
  }, [current, paused, autoplayInterval, goTo]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Hero"
      className="relative h-[560px] w-full overflow-hidden bg-black sm:h-[620px] lg:h-[680px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => {
        const active = index === current;
        return (
          <div
            key={slide.id}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              fill
              preload={index === 0}
              sizes="100vw"
              className={`object-cover object-[70%_center] transition-transform duration-[7000ms] ease-out ${
                active ? "scale-105" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent md:via-black/40" />

            <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10">
              <motion.div
                className="max-w-xl"
                initial="hidden"
                animate={active ? "show" : "hidden"}
                variants={textContainer}
              >
                <motion.span variants={lineGrow} className="mb-5 block h-0.5 w-10 origin-left bg-[#e0a458]" />
                <motion.p variants={textItem} className="mb-5 text-xs tracking-[0.3em] text-white/90 uppercase sm:text-sm">
                  {slide.eyebrow}
                </motion.p>
                <h1 className="font-serif text-5xl leading-[1.05] uppercase sm:text-6xl lg:text-7xl">
                  <motion.span variants={textItem} className="block text-white">
                    {slide.titleLine1}
                  </motion.span>
                  <motion.span
                    variants={textItem}
                    className="block bg-gradient-to-r from-[#c98a4b] via-[#f0c48c] to-[#b8763a] bg-clip-text text-transparent"
                  >
                    {slide.titleLine2}
                  </motion.span>
                </h1>
                <motion.p variants={textItem} className="mt-6 max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
                  {slide.description}
                </motion.p>
                <motion.div variants={textItem} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="mt-8 inline-block">
                <Link
                  href={slide.cta.href}
                  tabIndex={active ? 0 : -1}
                  className="group inline-flex items-center gap-3 rounded-md bg-gradient-to-r from-[#c98a4b] via-[#e8b47a] to-[#b8763a] px-6 py-3 text-sm font-medium text-black shadow-md transition hover:brightness-110"
                >
                  {slide.cta.label}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute top-1/2 right-3 z-10 flex -translate-y-1/2 flex-col gap-3 sm:right-6 sm:gap-5 lg:right-10"
      >
        <motion.button
          type="button"
          aria-label="Previous slide"
          onClick={() => goTo(current - 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0a458] bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-[#e0a458] hover:text-black sm:h-12 sm:w-12"
        >
          <Chevron direction="left" />
        </motion.button>
        <motion.button
          type="button"
          aria-label="Next slide"
          onClick={() => goTo(current + 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0a458] bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-[#e0a458] hover:text-black sm:h-12 sm:w-12"
        >
          <Chevron direction="right" />
        </motion.button>
      </motion.div>

      <div className="absolute bottom-10 left-0 z-10 w-full">
        <div className="mx-auto flex max-w-7xl gap-3 px-6 lg:px-10">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === current}
              onClick={() => goTo(index)}
              className="py-2"
            >
              <span className="relative block h-0.5 w-8 overflow-hidden bg-white/25 transition-colors hover:bg-white/50">
                {index === current && (
                  <motion.span
                    key={`${current}-${paused}`}
                    className="absolute inset-0 origin-left bg-[#e0a458]"
                    initial={{ scaleX: paused ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: paused ? 0 : autoplayInterval / 1000, ease: "linear" }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
