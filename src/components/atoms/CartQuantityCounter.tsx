import { decrementQuantityCart, incrementQuantityCart } from '@/app/cartSlice';
import type { RootState } from '@/app/store';
import { Minus, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './button';

const CartQuantityCounter = ({ productId }: { productId: number }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === productId),
  );

  const quantity = cartItem?.quantity ?? 0;

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        onClick={() => dispatch(decrementQuantityCart(productId))}
        className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
      >
        <Minus className="w-4 h-4" />
      </Button>

      <span className="text-sm font-medium">{quantity}</span>

      <Button
        variant="ghost"
        onClick={(e) => {
          e.preventDefault();
          dispatch(incrementQuantityCart(productId));
        }}
        className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default CartQuantityCounter;
