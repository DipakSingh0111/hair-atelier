"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, ChevronRightIcon } from "@/components/BlogIcons";

export type CategoryPost = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  image: { src: string; alt: string };
};

type BlogCategoriesProps = {
  categories: { name: string; posts: CategoryPost[] }[];
  currentSlug?: string;
  defaultOpen?: string;
  emptyLabel: string;
};

export default function BlogCategories({ categories, currentSlug, defaultOpen, emptyLabel }: BlogCategoriesProps) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);

  return (
    <ul className="divide-y divide-white/10">
      {categories.map(({ name, posts }) => {
        const expanded = open === name;
        const panelId = `category-${name.replace(/\W+/g, "-").toLowerCase()}`;
        return (
          <li key={name}>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpen(expanded ? null : name)}
              className={`group flex w-full items-center justify-between py-2.5 text-left text-sm transition hover:text-[#e0a458] ${
                expanded ? "text-[#e0a458]" : "text-white/85"
              }`}
            >
              <span className="flex items-center gap-2">
                {name}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    expanded ? "bg-[#e0a458] text-black" : "bg-white/10 text-white/60"
                  }`}
                >
                  {posts.length}
                </span>
              </span>
              <ChevronRightIcon
                className={`h-4 w-4 transition duration-300 ${
                  expanded ? "rotate-90 text-[#e0a458]" : "text-white/40 group-hover:text-[#e0a458]"
                }`}
              />
            </button>

            <div
              id={panelId}
              className={`grid transition-all duration-300 ease-out ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                {posts.length === 0 ? (
                  <p className="pb-3 text-xs text-white/50">{emptyLabel}</p>
                ) : (
                  <ul className="space-y-3 pb-4">
                    {posts.map((post) => {
                      const current = post.slug === currentSlug;
                      return (
                        <li key={post.slug}>
                          <Link
                            href={`/blogs/${post.slug}`}
                            tabIndex={expanded ? 0 : -1}
                            aria-current={current ? "page" : undefined}
                            className={`group/post flex items-center gap-3 rounded-lg border p-2 transition ${
                              current
                                ? "border-[#e0a458]/60 bg-[#e0a458]/10"
                                : "border-white/5 bg-white/[0.02] hover:border-[#e0a458]/40"
                            }`}
                          >
                            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                              <Image src={post.image.src} alt={post.image.alt} fill sizes="48px" className="object-cover" />
                            </span>
                            <span className="min-w-0">
                              <span className="line-clamp-2 text-xs leading-snug font-semibold text-white transition group-hover/post:text-[#f0c48c]">
                                {post.title}
                              </span>
                              <span className="mt-1 flex items-center gap-1.5 text-[11px] text-white/55">
                                <CalendarIcon className="h-3 w-3 text-[#e0a458]" />
                                <time dateTime={post.date}>{post.dateLabel}</time>
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
