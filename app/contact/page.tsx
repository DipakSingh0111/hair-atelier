import type { Metadata } from "next";
import {
  ContactFormSection,
  ContactInfoCards,
  ContactMapSection,
} from "@/components/ContactSections";
import PageBanner from "@/components/PageBanner";
import rawData from "@/data/hair-atelier.json";
import type { HairAtelierTemplateData } from "@/types/hair-atelier.types";

const templateData: HairAtelierTemplateData = rawData;
const sectionData = templateData.categories.HairAtelier.sections;

const { contact } = sectionData.PageBanners.variants.HairAtelierPageBanners1.pages;
const contactPage = sectionData.ContactPage.variants.HairAtelierContactPage1;

export const metadata: Metadata = {
  title: contact.metaTitle,
  description: contact.metaDescription,
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-black">
      <PageBanner
        title={contact.banner.title}
        breadcrumbs={contact.banner.breadcrumbs}
      />
      <ContactInfoCards data={contactPage.infoCards} />
      <ContactFormSection data={contactPage.form} />
      <ContactMapSection data={contactPage.map} />
    </main>
  );
}
