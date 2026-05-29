import { useGetProductsQuery } from '@/services/productApi';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useProductListing = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  const [params] = useSearchParams();
  const search = params.get('search') || '';
  const category = params.get('category') || '';

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  const categories = data
    ? Array.from(new Set(data.map((p) => p.category)))
    : [];

  const filteredProducts =
    data?.filter((product) => {
      const matchSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory = category === '' || product.category === category;

      return matchSearch && matchCategory;
    }) || [];

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return {
    isLoading,
    error,
    categories,
    currentPage,
    setCurrentPage,
    paginatedProducts,
    totalPages,
  };
};
