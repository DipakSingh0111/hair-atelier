import AboutSection from "@/components/AboutSection";
import BlogsSection from "@/components/BlogsSection";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main className="flex-1 bg-black">
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <BlogsSection />
    </main>
  );
}
