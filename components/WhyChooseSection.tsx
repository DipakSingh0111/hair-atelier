import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import siteData from "@/data/hair-atelier.json";
const data = siteData.whyChoose;

const icons: Record<string, React.ReactNode> = {
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
  "user-heart": (
    <>
      <circle cx="12" cy="7" r="3.5" />
      <path d="M5 21c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" />
      <path d="M12 19.5s-2.5-1.5-2.5-3a1.25 1.25 0 0 1 2.5-.5 1.25 1.25 0 0 1 2.5.5c0 1.5-2.5 3-2.5 3z" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 20c-3-2-4.5-5-4.5-8.5C7.5 8 12 4 12 4s4.5 4 4.5 7.5C16.5 15 15 18 12 20z" />
      <path d="M12 20c-4 0-8-2.5-9-7 3 0 5 1 6.5 2.5M12 20c4 0 8-2.5 9-7-3 0-5 1-6.5 2.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 13.6c2.9.2 5 2.2 5 5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z" />
  ),
};

export default function WhyChooseSection() {
  const { eyebrow, titleLine1, titleLine2, description, features } = data;

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
              <path d="M6 3h12l4 6-10 12L2 9z" />
              <path d="M2 9h20" />
            </svg>
            {eyebrow}
          </span>

          <h2 className="mt-6 font-heading text-4xl leading-tight font-semibold sm:text-5xl">
            <span className="block text-white">{titleLine1}</span>
            <span className="block bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text pr-1 italic text-transparent">
              {titleLine2}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {description}
          </p>
        </Reveal>

        <Stagger stagger={0.08} className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <StaggerItem key={feature.title} scale={0.92}>
            <article
              className="group flex h-full gap-4 rounded-xl border border-[#e0a458]/40 bg-gradient-to-br from-[#16110b] via-black to-black p-6 transition duration-300 hover:-translate-y-1 hover:border-[#e0a458] hover:shadow-[0_0_30px_-10px_rgba(224,164,88,0.55)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e0a458] text-[#e0a458] transition group-hover:bg-[#e0a458] group-hover:text-black">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icons[feature.icon]}
                </svg>
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{feature.description}</p>
                <span className="mt-4 block h-0.5 w-6 bg-[#e0a458] transition-all duration-300 group-hover:w-12" />
              </div>
            </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
