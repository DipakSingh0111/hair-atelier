import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import ServiceDetails from "@/components/ServiceDetails";
import rawData from "@/data/hair-atelier.json";
import type { HairAtelierTemplateData } from "@/types/hair-atelier.types";

const templateData: HairAtelierTemplateData = rawData;
const sectionData = templateData.categories.HairAtelier.sections;

const { serviceDetails } = sectionData.Services.variants.HairAtelierServices1;

function getService(slug: string) {
  return serviceDetails.list.find((service) => service.slug === slug);
}

export function generateStaticParams() {
  return serviceDetails.list.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Hair Atelier`,
    description: service.metaDescription,
  };
}

export default async function ServiceDetailsPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main className="flex-1 bg-black">
      <PageBanner
        title={serviceDetails.bannerTitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />
      <ServiceDetails
        service={service}
        overviewBadge={serviceDetails.overviewBadge}
        processBadge={serviceDetails.processBadge}
      />
    </main>
  );
}
