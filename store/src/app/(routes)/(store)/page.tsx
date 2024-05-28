import { Billboard } from "@/components/shared/billboard";
import { FeaturedProductsDisplay } from "./_components/featured-products-display";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Billboard
        title="Songbird Instruments"
        imageUrl="/images/cover.webp"
      />
      <FeaturedProductsDisplay />
    </div>
  );
}
