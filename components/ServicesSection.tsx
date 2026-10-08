import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion";
import siteData from "@/data/hair-atelier.json";
const data = siteData.services;

const icons: Record<string, React.ReactNode> = {
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" />
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
      <circle cx="17" cy="10.5" r="1" />
    </>
  ),
  face: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.5 9.5h13M7 9.5c0 2 1 3 2.5 3S12 11.5 12 9.5c0 2 1 3 2.5 3S17 11.5 17 9.5M9.5 16.5c1.5 1 3.5 1 5 0" />
    </>
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
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
}

export default function ServicesSection() {
  const { eyebrow, titleLine1, titleLine2, description, priceUnit, detailsLabel, services } = data;

  return (
    <section className="bg-black py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Stagger className="text-center">
          <StaggerItem direction="none" scale={0.8}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#e0a458] px-5 py-2 text-xs font-semibold tracking-[0.2em] text-[#e0a458] uppercase">
              <Icon name="scissors" className="h-4 w-4" />
              {eyebrow}
            </span>
          </StaggerItem>

          <StaggerItem as="h2" className="mt-6 font-heading text-4xl leading-tight font-semibold sm:text-5xl">
            <span className="block text-white">{titleLine1}</span>
            <span className="block bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text pr-1 italic text-transparent">
              {titleLine2}
            </span>
          </StaggerItem>

          <StaggerItem as="p" className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {description}
          </StaggerItem>
        </Stagger>

        <Stagger stagger={0.1} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.id} distance={50}>
            <article
              className="group relative flex h-full flex-col rounded-2xl border border-[#e0a458]/50 bg-gradient-to-br from-[#1a140d] via-black to-black p-7 shadow-[0_0_25px_-8px_rgba(224,164,88,0.35)] transition duration-300 hover:-translate-y-1 hover:border-[#e0a458] hover:shadow-[0_0_35px_-6px_rgba(224,164,88,0.55)]"
            >
              <span className="absolute top-6 right-7 font-heading text-4xl font-bold text-[#e0a458]/20 transition group-hover:text-[#e0a458]/35">
                {service.id}
              </span>

              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e0a458] bg-[#e0a458]/5 text-[#e0a458] shadow-[0_0_15px_-3px_rgba(224,164,88,0.5)]">
                <Icon name={service.icon} className="h-6 w-6" />
              </span>

              <h3 className="mt-6 font-heading text-2xl font-semibold text-white">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/75">{service.description}</p>

              <span className="mt-6 h-0.5 w-10 bg-[#e0a458]" />

              <div className="mt-4 flex items-center justify-between">
                <p>
                  <span className="text-2xl font-bold text-[#f0c48c]">{service.price}</span>
                  <span className="ml-2 text-xs text-white/70">{priceUnit}</span>
                </p>
                <Link
                  href={service.href}
                  className="flex items-center gap-3 text-xs font-medium text-white transition hover:text-[#e0a458]"
                >
                  {detailsLabel}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0a458] text-[#e0a458] transition group-hover:bg-[#e0a458] group-hover:text-black">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
