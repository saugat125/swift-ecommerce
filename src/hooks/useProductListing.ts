import { useGetProductsQuery } from '@/services/productApi';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useProductListing = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  const [params] = useSearchParams();

  const search = params.get('search') || '';
  const category = params.get('category') || '';

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  const categories = useMemo(() => {
    return data ? Array.from(new Set(data.map((p) => p.category))) : [];
  }, [data]);

  const filteredProducts = useMemo(() => {
    return (
      data?.filter((product) => {
        const matchSearch = product.title
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchCategory = category === '' || product.category === category;

        return matchSearch && matchCategory;
      }) || []
    );
  }, [data, search, category]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const safeCurrentPage = currentPage > totalPages ? 1 : currentPage;

  const startIndex = (safeCurrentPage - 1) * productsPerPage;

  const endIndex = startIndex + productsPerPage;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    isLoading,
    error,
    categories,
    paginatedProducts,
    totalPages,
    currentPage: safeCurrentPage,
    setCurrentPage,
  };
};
