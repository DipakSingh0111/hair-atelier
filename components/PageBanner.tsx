import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion";

export type Breadcrumb = { label: string; href?: string };

type PageBannerProps = {
  title: string;
  breadcrumbs: Breadcrumb[];
  image?: { src: string; alt: string };
};

export default function PageBanner({ title, breadcrumbs, image }: PageBannerProps) {
  return (
    <section className="relative z-10 mb-8 overflow-hidden border-b border-[#e0a458]/40 bg-black shadow-[0_15px_40px_-15px_rgba(224,164,88,0.4)] lg:mb-10">
      {image && (
        <>
          <Image src={image.src} alt={image.alt} fill preload sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/75" />
        </>
      )}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-[#c98a4b]/25 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#3a2510]/40 via-transparent to-transparent" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center sm:py-24 lg:py-28">
        <Reveal as="h1" immediate distance={30} className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </Reveal>

        <Reveal immediate delay={0.2} distance={20} className="mt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm backdrop-blur-sm">
            {breadcrumbs.map((crumb, i) => {
              const last = i === breadcrumbs.length - 1;
              return (
                <li key={crumb.label} className="flex items-center gap-2.5">
                  {i > 0 && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 text-white/50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  )}
                  {crumb.href && !last ? (
                    <Link href={crumb.href} className="text-white/85 transition hover:text-[#e0a458]">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current={last ? "page" : undefined} className="text-[#e0a458]">
                      {crumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        </Reveal>
      </div>
    </section>
  );
}
