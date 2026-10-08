import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarIcon } from "@/components/BlogIcons";
import BlogSidebar from "@/components/BlogSidebar";
import { Reveal } from "@/components/motion";
import { formatBlogDate } from "@/components/BlogCard";
import PageBanner from "@/components/PageBanner";
import rawData from "@/data/hair-atelier.json";
import type { HairAtelierTemplateData } from "@/types/hair-atelier.types";

const templateData: HairAtelierTemplateData = rawData;
const sectionData = templateData.categories.HairAtelier.sections;

const { bannerTitle } = sectionData.PageBanners.variants.HairAtelierPageBanners1.pages.blogDetail;
const { sidebar, posts: blogPosts } = sectionData.BlogNews.variants.HairAtelierBlogNews1;

const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);

export const instant = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Hair Atelier`,
    description: post.excerpt,
  };
}

function splitTitle(title: string, highlight: string) {
  return title.endsWith(highlight)
    ? [title.slice(0, -highlight.length).trim(), highlight]
    : [title, ""];
}

export default async function BlogDetailPage({
  params,
}: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const [titleStart, titleEnd] = splitTitle(post.title, post.titleHighlight);
  const { intro, sections, conclusionHeading, conclusion } = post.content;

  return (
    <main className="flex-1 bg-black">
      <PageBanner
        title={bannerTitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: bannerTitle },
        ]}
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-8 lg:grid-cols-[1fr_320px] lg:gap-12 lg:px-10 lg:py-10">
        <article>
          <Reveal
            as="h1"
            immediate
            className="font-heading text-4xl leading-tight font-semibold text-white sm:text-5xl"
          >
            {titleStart}
            {titleEnd && (
              <span className="block bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text text-transparent">
                {titleEnd}
              </span>
            )}
          </Reveal>

          <Reveal
            as="p"
            immediate
            delay={0.15}
            distance={20}
            className="mt-4 flex items-center gap-2 text-sm text-white/70"
          >
            <CalendarIcon className="h-4 w-4 text-[#e0a458]" />
            <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
          </Reveal>

          <Reveal
            immediate
            delay={0.25}
            direction="none"
            scale={0.95}
            className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl border border-[#e0a458]/60"
          >
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              preload
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal
            as="p"
            distance={30}
            className="mt-8 text-[15px] leading-relaxed text-white/85"
          >
            {intro}
          </Reveal>

          {sections.map((section, i) => (
            <Reveal
              as="section"
              key={section.heading}
              distance={30}
              className="mt-8"
            >
              <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
                <span className="text-white">{i + 1}. </span>
                <span className="bg-gradient-to-r from-[#e8b47a] via-[#f0c48c] to-[#c98a4b] bg-clip-text text-transparent">
                  {section.heading}
                </span>
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/85">
                {section.body}
              </p>
            </Reveal>
          ))}

          <Reveal as="section" distance={30} className="mt-10">
            <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
              {conclusionHeading}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/85">
              {conclusion}
            </p>
          </Reveal>

          <Reveal
            direction="right"
            distance={60}
            className="mt-10 flex items-center gap-3"
          >
            <span className="h-0.5 w-12 bg-[#e0a458]" />
            <span className="h-px flex-1 bg-white/10" />
          </Reveal>
        </article>

        <BlogSidebar data={sidebar} posts={blogPosts} currentSlug={post.slug} />
      </div>
    </main>
  );
}
