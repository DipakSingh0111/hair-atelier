"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { HeaderData } from "@/types/hair-atelier.types";

function ArrowIcon() {
  return (
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
  );
}

export default function Navbar({ data }: { data: HeaderData }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { logo, menu: links, cta } = data;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-t-4 border-[#0e5c5c] bg-black"
    >
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          whileHover={{ scale: 1.03 }}
          className="shrink-0"
        >
          <Link href={logo.href} onClick={() => setOpen(false)}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              preload
              className="h-auto w-44 sm:w-56"
            />
          </Link>
        </motion.div>

        <motion.ul
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.07, delayChildren: 0.25 },
            },
          }}
          className="hidden items-center gap-10 lg:flex"
        >
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <motion.li
                key={link.href}
                variants={{
                  hidden: { opacity: 0, y: -12 },
                  show: { opacity: 1, y: 0 },
                }}
                className="relative"
              >
                <Link
                  href={link.href}
                  className={`relative py-2 text-[15px] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:bg-[#e0a458]/60 after:transition-transform ${
                    active
                      ? "text-[#e0a458] after:scale-x-0"
                      : "text-white after:scale-x-0 hover:text-[#e0a458] hover:after:scale-x-100"
                  }`}
                >
                  {link.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute right-0 -bottom-1 left-0 h-0.5 bg-[#e0a458]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden lg:block"
        >
          <Link
            href={cta.href}
            className="group inline-flex items-center gap-3 rounded-md bg-gradient-to-r from-[#c98a4b] via-[#e8b47a] to-[#b8763a] px-5 py-3 text-[15px] font-medium text-black shadow-md transition hover:brightness-110"
          >
            {cta.label}
            <ArrowIcon />
          </Link>
        </motion.div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-[#e0a458] transition ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-[#e0a458] transition ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-[#e0a458] transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-black lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                },
              }}
              className="flex flex-col px-6"
            >
              {links.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-white/10 py-3 ${
                      isActive(link.href) ? "text-[#e0a458]" : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="px-6 pb-6">
              <Link
                href={cta.href}
                onClick={() => setOpen(false)}
                className="group mt-5 inline-flex items-center gap-3 rounded-md bg-gradient-to-r from-[#c98a4b] via-[#e8b47a] to-[#b8763a] px-5 py-3 font-medium text-black"
              >
                {cta.label}
                <ArrowIcon />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
