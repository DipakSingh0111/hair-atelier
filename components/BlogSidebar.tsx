import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowIcon,
  CalendarIcon,
  ChevronRightIcon,
  CrownIcon,
} from "@/components/BlogIcons";
import { formatBlogDate } from "@/components/BlogCard";
import { Stagger, StaggerItem } from "@/components/motion";
import type { BlogPost, BlogSidebarData } from "@/types/hair-atelier.types";

function Widget({ title, children }: { title: string; children: ReactNode }) {
  return (
    <StaggerItem
      direction="left"
      className="rounded-xl border border-white/10 bg-[#0f0e0d] p-5"
    >
      <h3 className="font-heading text-lg font-semibold text-white">{title}</h3>
      <span className="mt-2 mb-4 block h-0.5 w-8 bg-[#e0a458]" />
      {children}
    </StaggerItem>
  );
}

export default function BlogSidebar({
  data: sidebar,
  posts,
  currentSlug,
}: {
  data: BlogSidebarData;
  posts: BlogPost[];
  currentSlug?: string;
}) {
  const recent = posts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, sidebar.recentCount);
  const categories = sidebar.categories
    .map((name) => ({ name, posts: posts.filter((post) => post.category === name) }))
    .filter((category) => category.posts.length > 0);
  const { cta } = sidebar;

  return (
    <Stagger
      as="aside"
      stagger={0.15}
      delay={0.2}
      immediate
      className="space-y-6"
    >
      <Widget title={sidebar.recentTitle}>
        <ul className="space-y-4">
          {recent.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blogs/${post.slug}`}
                className="group flex items-center gap-3"
              >
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#e0a458]/40">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    sizes="64px"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                </span>
                <span className="min-w-0">
                  <span className="line-clamp-2 font-heading text-sm leading-snug font-semibold text-white transition group-hover:text-[#f0c48c]">
                    {post.title}
                  </span>
                  <span className="mt-1.5 flex items-center gap-1.5 text-xs text-white/60">
                    <CalendarIcon className="h-3.5 w-3.5 text-[#e0a458]" />
                    <time dateTime={post.date}>
                      {formatBlogDate(post.date)}
                    </time>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Widget>

      <Widget title={sidebar.categoriesTitle}>
        <ul className="divide-y divide-white/10">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                href={`/blogs/${category.posts[0].slug}`}
                className="group flex w-full items-center justify-between py-3 text-left text-sm text-white/85 transition hover:text-[#e0a458]"
              >
                <span className="flex items-center gap-2">{category.name}</span>
                <ChevronRightIcon className="h-4 w-4 text-white/40 transition group-hover:translate-x-1 group-hover:text-[#e0a458]" />
              </Link>
            </li>
          ))}
        </ul>
      </Widget>

      <StaggerItem
        direction="left"
        className="relative overflow-hidden rounded-xl border border-[#e0a458]/60 bg-[#0f0e0d] p-6 shadow-[0_0_30px_-12px_rgba(224,164,88,0.5)]"
      >
        <Image
          src={cta.image.src}
          alt={cta.image.alt}
          fill
          sizes="320px"
          className="object-cover object-right opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />
        <div className="relative max-w-[70%]">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#e0a458] uppercase">
            <CrownIcon />
            {cta.badge}
          </p>
          <h3 className="mt-3 font-heading text-2xl leading-tight font-semibold text-white">
            {cta.heading.main}
            <span className="block bg-gradient-to-r from-[#e8b47a] to-[#c98a4b] bg-clip-text text-transparent">
              {cta.heading.highlight}
            </span>
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-white/80">
            {cta.description}
          </p>
          <Link
            href={cta.button.href}
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f0b866] to-[#e8a850] px-5 py-2.5 text-xs font-semibold text-black transition hover:brightness-110"
          >
            {cta.button.label}
            <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </StaggerItem>
    </Stagger>
  );
}
