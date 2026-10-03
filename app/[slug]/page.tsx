import { notFound } from "next/navigation";
import PlantLandingPage, { getPlantLandingMetadata } from "@/src/components/PlantLandingPage";
import { plantLandingPages } from "@/src/data/plantLandingPages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return plantLandingPages
    .filter((page) => !("path" in page))
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const content = plantLandingPages.find((page) => page.slug === slug);

  if (!content) {
    notFound();
  }

  return getPlantLandingMetadata(content);
}

export default async function PlantCategoryRoute({ params }: PageProps) {
  const { slug } = await params;
  const content = plantLandingPages.find((page) => page.slug === slug);

  if (!content) {
    notFound();
  }

  return <PlantLandingPage content={content} />;
}
