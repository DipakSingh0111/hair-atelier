import Image from "next/image";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion";
import type { FooterData, Heading } from "@/types/hair-atelier.types";

const socialIcons: Record<string, React.ReactNode> = {
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v7h4v-7h3l1-4h-4V8z" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  youtube: (
    <>
      <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8z" />
      <path d="m10 15 5-3-5-3z" fill="currentColor" />
    </>
  ),
  pinterest: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M11 9.5c-1.6.6-2.2 2.6-1.2 3.8M12.6 8.2c2.2 0 3.6 1.5 3.6 3.4 0 2.2-1.3 3.8-3 3.8-1 0-1.6-.8-1.4-1.7L13 9M11.2 12.5 9.5 21" />
    </>
  ),
};

const contactIcons: Record<string, React.ReactNode> = {
  location: (
    <>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7z" />
      <circle cx="12" cy="9" r="2.5" fill="#e0a458" />
    </>
  ),
  phone: (
    <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 6 9 7 9-7" fill="none" stroke="#e0a458" strokeWidth={1.8} />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path
        d="M12 6v6l4 2"
        fill="none"
        stroke="#e0a458"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </>
  ),
};

function ColumnTitle({ heading }: { heading: Heading }) {
  return (
    <>
      <h3 className="font-heading text-2xl font-semibold text-white">
        {heading.main}{" "}
        <span className="bg-gradient-to-r from-[#e8b47a] to-[#c98a4b] bg-clip-text pr-1 italic text-transparent">
          {heading.highlight}
        </span>
      </h3>
      <span className="mt-3 mb-6 block h-0.5 w-10 bg-[#e0a458]" />
    </>
  );
}

export default function Footer({ data }: { data: FooterData }) {
  const { logo, description, socials, columns, contact, copyright } = data;

  return (
    <footer className="relative z-10 border-t border-[#e0a458]/40 bg-black shadow-[0_-15px_40px_-15px_rgba(224,164,88,0.4)]">
      <Stagger
        stagger={0.15}
        className="mx-auto grid max-w-7xl gap-12 px-6 py-10 lg:py-12 grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.25fr] lg:gap-0 lg:px-10"
      >
        <StaggerItem className="col-span-2 sm:col-span-1 lg:pr-10">
          <Link href={logo.href} className="inline-block">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-auto w-56"
            />
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/85">
            {description}
          </p>
          <div className="mt-7 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.icon}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e0a458] text-[#e0a458] transition hover:-translate-y-1 hover:rotate-[360deg] hover:bg-[#e0a458] hover:text-black hover:duration-500"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {socialIcons[social.icon]}
                </svg>
              </a>
            ))}
          </div>
        </StaggerItem>

        {columns.map((column) => (
          <StaggerItem
            key={column.heading.highlight}
            className="col-span-1 lg:border-l lg:border-white/10 lg:px-10"
          >
            <ColumnTitle heading={column.heading} />
            <ul className="space-y-3.5">
              {column.list.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 text-sm text-white/90 transition hover:text-[#e0a458]"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-[#e0a458] transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}

        <StaggerItem className="col-span-2 sm:col-span-1 lg:border-l lg:border-white/10 lg:pl-10">
          <ColumnTitle heading={contact.heading} />
          <ul className="space-y-5">
            {contact.list.map((item) => {
              const content = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e8b47a] to-[#c98a4b] text-black">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="currentColor"
                    >
                      {contactIcons[item.icon]}
                    </svg>
                  </span>
                  <span className="text-sm leading-relaxed text-white/90 transition group-hover:text-[#e0a458]">
                    {item.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </>
              );
              return (
                <li key={item.icon}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group flex items-center gap-4"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </StaggerItem>
      </Stagger>

      <div className="border-t border-[#e0a458]/60">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-white/85 lg:px-10">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
