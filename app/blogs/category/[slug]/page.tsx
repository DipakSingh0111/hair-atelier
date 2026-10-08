import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogGrid } from "@/components/BlogList";
import BlogsSection from "@/components/BlogsSection";
import PageBanner from "@/components/PageBanner";
import rawData from "@/data/hair-atelier.json";
import type { HairAtelierTemplateData } from "@/types/hair-atelier.types";

const templateData: HairAtelierTemplateData = rawData;
const sectionData = templateData.categories.HairAtelier.sections;

const { blogs } = sectionData.PageBanners.variants.HairAtelierPageBanners1.pages;
const blogNews = sectionData.BlogNews.variants.HairAtelierBlogNews1;

const getCategorySlug = (category: string) => category.toLowerCase().replace(/ /g, "-");
const getCategoryBySlug = (slug: string) =>
  blogNews.sidebar.categories.find((category) => getCategorySlug(category) === slug);
const getPostsByCategory = (category: string) =>
  blogNews.posts.filter((post) => post.category === category);

export function generateStaticParams() {
  return blogNews.sidebar.categories.map((category) => ({ slug: getCategorySlug(category) }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category} | Hair Atelier`,
    description: `Read all articles in the ${category} category from Hair Atelier.`,
  };
}

export default async function CategoryPage({ params }: PageProps<"/blogs/category/[slug]">) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <main className="flex-1 bg-black">
      <PageBanner
        title={category}
        breadcrumbs={[...blogs.banner.breadcrumbs, { label: category }]}
      />
      <BlogsSection data={blogNews} className="py-16 lg:py-24">
        <BlogGrid
          posts={getPostsByCategory(category)}
          readMoreLabel={blogNews.readMoreLabel}
          emptyMessage={blogNews.emptyMessage}
        />
      </BlogsSection>
    </main>
  );
}
