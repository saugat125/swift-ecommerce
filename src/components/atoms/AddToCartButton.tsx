import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/cartSlice';
import type { Product } from '@/types/product';
import { toast } from 'sonner';
import { Button } from './button';

const AddToCartButton = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  return (
    <Button
      className="text-xs bg-[#00bd32] cursor-pointer hover:scale-102 transition-transform duration-200"
      onClick={(e) => {
        e.preventDefault();
        dispatch(addToCart({ ...product, quantity: 1 }));
        toast.success('Added to cart');
      }}
    >
      Add to cart
    </Button>
  );
};

export default AddToCartButton;
