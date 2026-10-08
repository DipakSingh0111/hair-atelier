import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ServicesSection from "@/components/ServicesSection";
import rawData from "@/data/hair-atelier.json";
import type { HairAtelierTemplateData } from "@/types/hair-atelier.types";

const templateData: HairAtelierTemplateData = rawData;
const sectionData = templateData.categories.HairAtelier.sections;

const { services } = sectionData.PageBanners.variants.HairAtelierPageBanners1.pages;

export const metadata: Metadata = {
  title: services.metaTitle,
  description: services.metaDescription,
};

export default function ServicesPage() {
  return (
    <main className="flex-1 bg-black">
      <PageBanner
        title={services.banner.title}
        breadcrumbs={services.banner.breadcrumbs}
      />
      <ServicesSection data={sectionData.Services.variants.HairAtelierServices1} />
    </main>
  );
}
