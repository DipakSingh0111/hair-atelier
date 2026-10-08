import { Suspense } from "react";
import type { Metadata } from "next";
import BlogList, { BlogGrid } from "@/components/BlogList";
import PageBanner from "@/components/PageBanner";
import BlogsSection from "@/components/BlogsSection";
import siteData from "@/data/hair-atelier.json";

const { blogs } = siteData.pages;

export const metadata: Metadata = {
  title: blogs.metaTitle,
  description: blogs.metaDescription,
};

export default function BlogsPage() {
  return (
    <main className="flex-1 bg-black">
      <PageBanner title={blogs.banner.title} breadcrumbs={blogs.banner.breadcrumbs} />
      <BlogsSection>
        <div className="mt-12">
          <Suspense fallback={<BlogGrid />}>
            <BlogList />
          </Suspense>
        </div>
      </BlogsSection>
    </main>
  );
}
