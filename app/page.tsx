import AboutSection from "@/components/AboutSection";
import BlogsSection from "@/components/BlogsSection";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import rawData from "@/data/hair-atelier.json";
import type { HairAtelierTemplateData } from "@/types/hair-atelier.types";

const templateData: HairAtelierTemplateData = rawData;
const sectionData = templateData.categories.HairAtelier.sections;

export default function Home() {
  return (
    <main className="flex-1 bg-black">
      <HeroSection data={sectionData.HeroBanner.variants.HairAtelierHeroBanner1} />
      <AboutSection data={sectionData.AboutUs.variants.HairAtelierAboutUs1} />
      <StatsSection data={sectionData.Stats.variants.HairAtelierStats1} />
      <ServicesSection data={sectionData.Services.variants.HairAtelierServices1} />
      <GallerySection data={sectionData.Gallery.variants.HairAtelierGallery1} />
      <TestimonialsSection data={sectionData.Testimonials.variants.HairAtelierTestimonials1} />
      <BlogsSection data={sectionData.BlogNews.variants.HairAtelierBlogNews1} />
    </main>
  );
}
