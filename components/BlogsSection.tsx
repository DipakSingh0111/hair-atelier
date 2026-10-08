import type { ReactNode } from "react";
import BlogCard from "@/components/BlogCard";
import { DocumentIcon } from "@/components/BlogIcons";
import { Reveal, Stagger } from "@/components/motion";
import siteData from "@/data/hair-atelier.json";
import { blogPosts } from "@/lib/blogs";

const data = siteData.blogs;

type BlogsSectionProps = {
  limit?: number;
  children?: ReactNode;
  className?: string;
};

export default function BlogsSection({ limit = 3, children, className = "py-8 lg:py-10" }: BlogsSectionProps) {
  const { eyebrow, titleLine1, titleLine2, description, readMoreLabel } = data;

  return (
    <section className={`bg-black ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#e0a458] px-5 py-2 text-xs font-semibold tracking-[0.2em] text-[#e0a458] uppercase">
            <DocumentIcon />
            {eyebrow}
          </span>

          <h2 className="mt-6 font-heading text-4xl leading-tight font-semibold sm:text-5xl">
            <span className="block text-white">{titleLine1}</span>
            <span className="block bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text pr-1 italic text-transparent">
              {titleLine2}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm text-white/80 sm:text-base">{description}</p>
        </Reveal>

        {children ?? (
          <Stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, limit).map((post) => (
              <BlogCard key={post.id} post={post} readMoreLabel={readMoreLabel} />
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}
