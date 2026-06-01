import ProductCardSkeleton from '@/components/molecules/ProductCardSkeleton';
import ProductGrid from '@/components/organisms/ProductGrid';
import type { Product } from '@/types/product';

type RelatedProductsSectionProps = {
  products: Product[];
  isLoading: boolean;
};

const RelatedProductsSection = ({
  products,
  isLoading,
}: RelatedProductsSectionProps) => {
  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section className="max-w-5xl mx-auto px-4 pb-10 mt-10">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Related Products</h2>
        <p className="text-sm text-muted-foreground mb-8">
          More products from the same category
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10 mb-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  );
};

export default RelatedProductsSection;
