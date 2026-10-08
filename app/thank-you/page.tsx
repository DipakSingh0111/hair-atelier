import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion";
import ThankYouCheck from "@/components/ThankYouCheck";
import rawData from "@/data/hair-atelier.json";
import type { HairAtelierTemplateData } from "@/types/hair-atelier.types";

const templateData: HairAtelierTemplateData = rawData;
const sectionData = templateData.categories.HairAtelier.sections;

const meta = sectionData.PageBanners.variants.HairAtelierPageBanners1.pages.thankYou;
const { background, heading, lines, button } = sectionData.ThankYouPage.variants.HairAtelierThankYouPage1;

export const metadata: Metadata = {
  title: meta.metaTitle,
  description: meta.metaDescription,
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <main className="relative flex flex-1 items-center overflow-hidden border-t border-white/10 bg-black">
      <Image
        src={background.src}
        alt={background.alt}
        fill
        preload
        sizes="100vw"
        className="scale-105 object-cover blur-[3px]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.6)_55%,rgba(0,0,0,0.35)_100%)]" />

      <Stagger
        as="section"
        immediate
        delay={0.6}
        stagger={0.15}
        className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-28"
      >
        <ThankYouCheck />

        <StaggerItem
          as="h1"
          className="mt-8 font-heading text-6xl font-semibold tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="text-white">{heading.main} </span>
          <span className="bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#d9a066] bg-clip-text text-transparent">
            {heading.highlight}
          </span>
        </StaggerItem>

        <StaggerItem
          as="span"
          direction="none"
          scale={0.1}
          className="mt-6 block h-0.5 w-14 bg-[#e0a458]"
        />

        <StaggerItem
          as="p"
          className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg"
        >
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </StaggerItem>

        <StaggerItem>
          <Link
            href={button.href}
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#f0b866] via-[#f5c27a] to-[#e8a850] px-10 py-4 text-base font-semibold text-black shadow-[0_0_30px_-8px_rgba(240,184,102,0.7)] transition hover:brightness-110"
          >
            {button.label}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </StaggerItem>
      </Stagger>
    </main>
  );
}
