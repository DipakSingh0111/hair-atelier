import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogGrid } from "@/components/BlogList";
import PageBanner from "@/components/PageBanner";
import BlogsSection from "@/components/BlogsSection";
import siteData from "@/data/hair-atelier.json";
import { getCategoryBySlug, getCategorySlug, getPostsByCategory } from "@/lib/blogs";

const { blogs } = siteData.pages;

export function generateStaticParams() {
  return siteData.blogSidebar.categories.map((category) => ({ slug: getCategorySlug(category) }));
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category} | Hair Atelier`,
    description: `Read all articles in the ${category} category from Hair Atelier.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(category);

  return (
    <main className="flex-1 bg-black">
      <PageBanner
        title={category}
        breadcrumbs={[
          ...blogs.banner.breadcrumbs,
          { label: category }
        ]}
      />
      <BlogsSection>
        <div className="mt-12">
          <BlogGrid posts={posts} />
        </div>
      </BlogsSection>
    </main>
  );
}
