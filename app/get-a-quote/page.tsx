import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import QuoteSection from "@/components/QuoteSection";
import rawData from "@/data/hair-atelier.json";
import type { HairAtelierTemplateData } from "@/types/hair-atelier.types";

const templateData: HairAtelierTemplateData = rawData;
const sectionData = templateData.categories.HairAtelier.sections;

const { quote } = sectionData.PageBanners.variants.HairAtelierPageBanners1.pages;

export const metadata: Metadata = {
  title: quote.metaTitle,
  description: quote.metaDescription,
};

export default function GetAQuotePage() {
  return (
    <main className="flex-1 bg-black">
      <PageBanner
        title={quote.banner.title}
        breadcrumbs={quote.banner.breadcrumbs}
      />
      <QuoteSection data={sectionData.QuotePage.variants.HairAtelierQuotePage1} />
    </main>
  );
}
