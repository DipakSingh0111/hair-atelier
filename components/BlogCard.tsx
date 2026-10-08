import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, LongArrowIcon } from "@/components/BlogIcons";
import { StaggerItem } from "@/components/motion";
import { blogHref, formatBlogDate, type BlogPost } from "@/lib/blogs";

export default function BlogCard({ post, readMoreLabel }: { post: BlogPost; readMoreLabel: string }) {
  const href = blogHref(post);

  return (
    <StaggerItem distance={50}>
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e0a458]/60 bg-[#121110] shadow-[0_0_25px_-12px_rgba(224,164,88,0.5)] transition duration-300 hover:-translate-y-1 hover:border-[#e0a458]">
      <Link href={href} className="relative block aspect-video overflow-hidden">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <span className="absolute top-4 left-4 rounded-full bg-[#f29a1f] px-3.5 py-1 text-xs font-semibold text-black">
          {post.tag}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-2 text-xs text-white/70">
          <CalendarIcon className="h-4 w-4 text-[#e0a458]" />
          <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
        </p>

        <h3 className="mt-3 text-lg font-semibold text-white transition group-hover:text-[#f0c48c]">
          <Link href={href}>{post.title}</Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{post.excerpt}</p>

        <div className="mt-4 border-t border-white/10 pt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#e0a458] transition hover:text-[#f0c48c]"
          >
            {readMoreLabel}
            <LongArrowIcon className="h-4 w-6 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
    </StaggerItem>
  );
}
