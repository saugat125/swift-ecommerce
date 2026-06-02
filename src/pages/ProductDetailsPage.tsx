import ProductDetailsSkeleton from '@/components/molecules/ProductDetailsSkeleton';
import ProductDetailsSection from '@/components/organisms/ProductDetailsSection';
import RelatedProductsSection from '@/components/molecules/RelatedProductsSection';
import {
  useGetProductsByIdQuery,
  useGetProductsQuery,
} from '@/services/productApi';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '@/components/organisms/NotFound';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const id = Number(productId);

  const { data: product, error, isLoading } = useGetProductsByIdQuery(id);
  const { data: products = [], isLoading: isRelatedProductsLoading } =
    useGetProductsQuery();

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return products.filter(
      (item) => item.category === product.category && item.id !== product.id,
    );
  }, [product, products]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <ProductDetailsSkeleton />
      </div>
    );
  }

  if (!productId || isNaN(id)) {
    return <NotFound />;
  }

  if (error) {
    return (
      <div className="text-red-600 ml-10 lg:ml-16">
        Failed to load product details.
      </div>
    );
  }
  if (!product) {
    return <NotFound />;
  }

  return (
    <>
      <ProductDetailsSection product={product} />
      <RelatedProductsSection
        products={relatedProducts}
        isLoading={isRelatedProductsLoading}
      />
    </>
  );
};

export default ProductDetailsPage;
