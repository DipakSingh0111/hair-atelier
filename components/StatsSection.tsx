"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/motion";
import type { StatsData } from "@/types/hair-atelier.types";

const icons: Record<string, React.ReactNode> = {
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 13.6c2.9.2 5 2.2 5 5" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" />
    </>
  ),
  star: (
    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z" />
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4" />
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
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
}

function CountUp({
  value,
  decimals,
  suffix,
}: {
  value: number;
  decimals: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 2000;
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setDisplay(value * (1 - Math.pow(1 - progress, 3)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function StatsSection({ data }: { data: StatsData }) {
  const { badge, heading, description, background, list: stats } = data;

  return (
    <section className="relative overflow-hidden bg-black py-8 lg:py-10">
      <Image
        src={background.src}
        alt={background.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-10">
        <Stagger>
          <StaggerItem
            direction="none"
            scale={0.7}
            className="flex items-center justify-center gap-4"
          >
            <span className="h-px w-24 bg-gradient-to-r from-transparent to-[#e0a458] sm:w-32" />
            <motion.span
              animate={{ rotate: [0, -12, 12, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.5 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e0a458] text-[#e0a458]"
            >
              <Icon name="scissors" className="h-5 w-5" />
            </motion.span>
            <span className="h-px w-24 bg-gradient-to-l from-transparent to-[#e0a458] sm:w-32" />
          </StaggerItem>

          <StaggerItem
            as="p"
            className="mt-6 text-xs tracking-[0.3em] text-white/80 uppercase sm:text-sm"
          >
            {badge}
          </StaggerItem>

          <StaggerItem
            as="h2"
            className="mt-3 font-heading text-3xl font-semibold sm:text-5xl"
          >
            <span className="text-white">{heading.main} </span>
            <span className="bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text pr-1 italic text-transparent">
              {heading.highlight}
            </span>
          </StaggerItem>

          <StaggerItem
            as="p"
            className="mx-auto mt-5 max-w-2xl text-sm text-white/80 sm:text-base"
          >
            {description}
          </StaggerItem>
        </Stagger>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} distance={50}>
              <div className="flex h-full flex-col items-center rounded-xl border border-[#e0a458]/40 bg-black/55 px-6 py-8 backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#e0a458]">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e0a458] text-[#e0a458]">
                  <Icon name={stat.icon} className="h-6 w-6" />
                </span>
                <p className="mt-5 font-heading text-4xl font-bold text-[#f0c48c] lg:text-[42px]">
                  <CountUp
                    value={stat.value}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-2 text-sm text-white/90">{stat.label}</p>
                <span className="mt-5 h-px w-10 bg-[#e0a458]" />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
