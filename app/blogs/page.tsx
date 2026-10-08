import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import PageBanner from "@/components/PageBanner";
import BlogsSection from "@/components/BlogsSection";
import rawData from "@/data/hair-atelier.json";
import type { HairAtelierTemplateData } from "@/types/hair-atelier.types";

const templateData: HairAtelierTemplateData = rawData;
const sectionData = templateData.categories.HairAtelier.sections;

const { blogs } = sectionData.PageBanners.variants.HairAtelierPageBanners1.pages;
const blogNews = sectionData.BlogNews.variants.HairAtelierBlogNews1;

export const metadata: Metadata = {
  title: blogs.metaTitle,
  description: blogs.metaDescription,
};

export default function BlogsPage() {
  return (
    <main className="flex-1 bg-black">
      <PageBanner
        title={blogs.banner.title}
        breadcrumbs={blogs.banner.breadcrumbs}
      />
      <BlogsSection data={blogNews}>
        <div className="mt-12">
          <BlogList data={blogNews} />
        </div>
      </BlogsSection>
    </main>
  );
}
