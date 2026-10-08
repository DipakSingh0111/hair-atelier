import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import QuoteSection from "@/components/QuoteSection";
import siteData from "@/data/hair-atelier.json";

const { quote } = siteData.pages;

export const metadata: Metadata = {
  title: quote.metaTitle,
  description: quote.metaDescription,
};

export default function GetAQuotePage() {
  return (
    <main className="flex-1 bg-black">
      <PageBanner title={quote.banner.title} breadcrumbs={quote.banner.breadcrumbs} />
      <QuoteSection />
    </main>
  );
}
