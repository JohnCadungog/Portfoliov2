import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Portfolio from "@/components/Portfolio";
import { careerOrder, careers, isCareer, person } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return careerOrder.map((career) => ({ career }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ career: string }>;
}): Promise<Metadata> {
  const { career } = await params;
  if (!isCareer(career)) return {};
  const c = careers[career];
  return {
    title: `${person.name} — ${c.title}`,
    description: c.pitch,
  };
}

export default async function CareerPage({ params }: { params: Promise<{ career: string }> }) {
  const { career } = await params;
  if (!isCareer(career)) notFound();
  return <Portfolio initial={career} />;
}
