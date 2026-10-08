import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import PageBanner from "@/components/PageBanner";
import siteData from "@/data/hair-atelier.json";
const pages = siteData.pages;

const { gallery } = pages;

export const metadata: Metadata = {
  title: gallery.metaTitle,
  description: gallery.metaDescription,
};

export default function GalleryPage() {
  return (
    <main className="flex-1 bg-black">
      <PageBanner title={gallery.banner.title} breadcrumbs={gallery.banner.breadcrumbs} />
      <GalleryGrid />
    </main>
  );
}
