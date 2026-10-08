import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";
import PageBanner from "@/components/PageBanner";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import siteData from "@/data/hair-atelier.json";
const pages = siteData.pages;

const { about } = pages;

export const metadata: Metadata = {
  title: about.metaTitle,
  description: about.metaDescription,
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-black">
      <PageBanner title={about.banner.title} breadcrumbs={about.banner.breadcrumbs} />
      <AboutSection />
      <StatsSection />
      <WhyChooseSection />
      <TestimonialsSection />
    </main>
  );
}
