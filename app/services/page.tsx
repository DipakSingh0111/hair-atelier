import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ServicesSection from "@/components/ServicesSection";
import siteData from "@/data/hair-atelier.json";

const pages = siteData.pages;
const { services } = pages;

export const metadata: Metadata = {
  title: services.metaTitle,
  description: services.metaDescription,
};

export default function ServicesPage() {
  return (
    <main className="flex-1 bg-black">
      <PageBanner title={services.banner.title} breadcrumbs={services.banner.breadcrumbs} />
      <ServicesSection />
    </main>
  );
}
