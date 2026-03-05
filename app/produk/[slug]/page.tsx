import ProductDetail from "@/components/features/ProductDetail";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const metadata: Metadata = {
  title: "Product Detail | Drop.Wear",
  description: "Explore the details of our curated fashion collection.",
};

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
      <ProductDetail productId={slug} />
    </main>
  );
}