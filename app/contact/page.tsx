import type { Metadata } from "next";
import { ContactFormSection, ContactInfoCards, ContactMapSection } from "@/components/ContactSections";
import PageBanner from "@/components/PageBanner";
import siteData from "@/data/hair-atelier.json";

const { contact } = siteData.pages;

export const metadata: Metadata = {
  title: contact.metaTitle,
  description: contact.metaDescription,
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-black">
      <PageBanner title={contact.banner.title} breadcrumbs={contact.banner.breadcrumbs} />
      <ContactInfoCards />
      <ContactFormSection />
      <ContactMapSection />
    </main>
  );
}
