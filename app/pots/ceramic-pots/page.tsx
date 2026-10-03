import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlantLandingPage, { getPlantLandingMetadata } from "@/src/components/PlantLandingPage";
import { plantLandingPages } from "@/src/data/plantLandingPages";

function getCeramicPotsPage() {
  const content = plantLandingPages.find((page) => page.slug === "ceramic-pots");

  if (!content) {
    notFound();
  }

  return content;
}

export function generateMetadata(): Metadata {
  return getPlantLandingMetadata(getCeramicPotsPage());
}

export default function CeramicPotsRoute() {
  return <PlantLandingPage content={getCeramicPotsPage()} />;
}
