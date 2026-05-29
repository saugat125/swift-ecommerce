import ProductDetailsPage from '@/pages/ProductDetailsPage';
import ProductPage from '@/pages/ProductPage';
import { Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/products/:productId" element={<ProductDetailsPage />} />
    </Routes>
  );
};

export default AppRoutes;
