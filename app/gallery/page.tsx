import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import PageBanner from "@/components/PageBanner";
import rawData from "@/data/hair-atelier.json";
import type { HairAtelierTemplateData } from "@/types/hair-atelier.types";

const templateData: HairAtelierTemplateData = rawData;
const sectionData = templateData.categories.HairAtelier.sections;

const { gallery } = sectionData.PageBanners.variants.HairAtelierPageBanners1.pages;

export const metadata: Metadata = {
  title: gallery.metaTitle,
  description: gallery.metaDescription,
};

export default function GalleryPage() {
  return (
    <main className="flex-1 bg-black">
      <PageBanner
        title={gallery.banner.title}
        breadcrumbs={gallery.banner.breadcrumbs}
      />
      <GalleryGrid data={sectionData.Gallery.variants.HairAtelierGallery1.page} />
    </main>
  );
}
