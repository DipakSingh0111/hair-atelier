import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import ServiceDetails from "@/components/ServiceDetails";
import siteData from "@/data/hair-atelier.json";

const { bannerTitle, items } = siteData.serviceDetails;

function getService(slug: string) {
  return Object.hasOwn(items, slug) ? items[slug as keyof typeof items] : undefined;
}

export function generateStaticParams() {
  return Object.keys(items).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Hair Atelier`,
    description: service.metaDescription,
  };
}

export default async function ServiceDetailsPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main className="flex-1 bg-black">
      <PageBanner
        title={bannerTitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />
      <ServiceDetails service={service} />
    </main>
  );
}
