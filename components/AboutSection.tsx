import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import siteData from "@/data/hair-atelier.json";
const about = siteData.about;

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
  diamond: (
    <>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20M12 21 8 9l4-6 4 6z" />
    </>
  ),
};

export default function AboutSection() {
  const { eyebrow, titleLine1, titleLine2, paragraphs, badge, images, features, cta } = about;

  return (
    <section className="bg-black py-8 lg:py-10">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-14 lg:px-10">
        <Reveal direction="right" distance={60} className="relative mx-auto w-full max-w-xl pt-6 pr-10 pb-14 pl-6 sm:pr-16">
          <div className="relative overflow-hidden rounded-2xl border border-[#e0a458]/60">
            <Image
              src={images.main.src}
              alt={images.main.alt}
              width={images.main.width}
              height={images.main.height}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
          </div>

          <Reveal
            direction="none"
            scale={0.6}
            delay={0.45}
            className="absolute top-0 left-0 rounded-xl bg-gradient-to-br from-[#e8b47a] via-[#d9a066] to-[#b8763a] px-6 py-4 text-center text-black shadow-xl sm:px-8 sm:py-5"
          >
            <p className="text-2xl font-semibold sm:text-3xl">{badge.value}</p>
            <p className="mt-1 text-xs font-medium sm:text-sm">{badge.label}</p>
          </Reveal>

          <Reveal
            delay={0.3}
            distance={50}
            className="absolute right-0 bottom-0 w-[42%] overflow-hidden rounded-2xl border-2 border-[#e0a458]/70 shadow-2xl"
          >
            <Image
              src={images.secondary.src}
              alt={images.secondary.alt}
              width={images.secondary.width}
              height={images.secondary.height}
              sizes="(min-width: 1024px) 240px, 40vw"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
          </Reveal>
        </Reveal>

        <Stagger>
          <StaggerItem className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#e0a458]" />
            <p className="text-sm tracking-[0.3em] text-[#e0a458] uppercase">{eyebrow}</p>
          </StaggerItem>

          <StaggerItem as="h2" className="mt-5 font-heading text-3xl leading-tight font-semibold sm:text-5xl lg:text-[40px] xl:text-5xl">
            <span className="block text-white sm:whitespace-nowrap">{titleLine1}</span>
            <span className="block bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text pr-2 italic text-transparent sm:whitespace-nowrap">
              {titleLine2}
            </span>
          </StaggerItem>

          <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-white/85">
            {paragraphs.map((text) => (
              <StaggerItem as="p" key={text}>
                {text}
              </StaggerItem>
            ))}
          </div>

          <ul className="mt-8 space-y-6">
            {features.map((feature) => (
              <StaggerItem as="li" direction="left" key={feature.title} className="flex items-center gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e8b47a] to-[#b8763a] text-black">
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
                    {icons[feature.icon]}
                  </svg>
                </span>
                <span className="h-10 w-px shrink-0 bg-white/20" />
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </ul>

          <StaggerItem>
          <Link
            href={cta.href}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#c98a4b] via-[#e8b47a] to-[#b8763a] px-7 py-3.5 text-[15px] font-semibold text-black shadow-md transition hover:brightness-110"
          >
            {cta.label}
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
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
