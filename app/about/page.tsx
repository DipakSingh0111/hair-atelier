import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";
import PageBanner from "@/components/PageBanner";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import rawData from "@/data/hair-atelier.json";
import type { HairAtelierTemplateData } from "@/types/hair-atelier.types";

const templateData: HairAtelierTemplateData = rawData;
const sectionData = templateData.categories.HairAtelier.sections;

const { about } = sectionData.PageBanners.variants.HairAtelierPageBanners1.pages;

export const metadata: Metadata = {
  title: about.metaTitle,
  description: about.metaDescription,
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-black">
      <PageBanner
        title={about.banner.title}
        breadcrumbs={about.banner.breadcrumbs}
      />
      <AboutSection data={sectionData.AboutUs.variants.HairAtelierAboutUs1} />
      <StatsSection data={sectionData.Stats.variants.HairAtelierStats1} />
      <WhyChooseSection data={sectionData.WhyChooseUs.variants.HairAtelierWhyChooseUs1} />
      <TestimonialsSection data={sectionData.Testimonials.variants.HairAtelierTestimonials1} />
    </main>
  );
}
