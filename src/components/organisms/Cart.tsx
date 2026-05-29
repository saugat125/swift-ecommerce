import {
  decrementQuantityCart,
  incrementQuantityCart,
  removeFromCart,
} from '@/app/cartSlice';
import type { RootState } from '@/app/store';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/atoms/sheet';

import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative cursor-pointer">
          <ShoppingCart className="w-6 h-6" />
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-2xl font-semibold">My Cart</SheetTitle>

          <SheetDescription>Review your selected products</SheetDescription>
        </SheetHeader>

        {cartItems.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            No products in cart.
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border rounded-2xl p-3 mb-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 rounded-xl object-contain"
              />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-base">{item.title}</h3>

                  <p className="text-sm text-muted-foreground mt-1">
                    {item.category}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-4 items-center">
                    <p className="text-lg font-bold">{`$${item.price.toFixed(2)}`}</p>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => dispatch(decrementQuantityCart(item.id))}
                        className="w-8 h-8 rounded-md border flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="text-sm font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => dispatch(incrementQuantityCart(item.id))}
                        className="w-8 h-8 rounded-md border flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    className="text-red-500 transition cursor-pointer"
                    onClick={() => {
                      dispatch(removeFromCart(item.id));
                      toast.info('Removed from cart');
                    }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cartItems?.length > 0 && (
          <div className="border-t pt-5 px-4 mb-10">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">Total</p>

              <p className="text-2xl font-bold">{`$${totalPrice.toFixed(2)}`}</p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
