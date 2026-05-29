import FilterDropdown from '@/components/molecules/FilterDropdown';
import PaginationSection from '@/components/molecules/PaginationSection';
import ProductCardSkeleton from '@/components/molecules/ProductCardSkeleton';
import SearchBar from '@/components/molecules/SearchBar';
import ProductGrid from '@/components/organisms/ProductGrid';
import { useProductListing } from '@/hooks/useProductListing';

const ProductPage = () => {
  const {
    isLoading,
    error,
    categories,
    paginatedProducts,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useProductListing();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-12 lg:px-12 xl:px-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4 mt-4 lg:mb-8">
        Products
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full md:w-auto mb-8 lg:mb-12">
        <SearchBar />

        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600">Filter by category:</p>
          <FilterDropdown categories={categories} />
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {error && <div className="text-red-600">Failed to load products.</div>}

      {!isLoading && !error && paginatedProducts.length === 0 && (
        <div className="text-red-600">No products found.</div>
      )}

      {!isLoading && !error && <ProductGrid products={paginatedProducts} />}

      <PaginationSection
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ProductPage;
