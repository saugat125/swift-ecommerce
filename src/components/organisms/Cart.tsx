import { ShoppingCart, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import type { RootState } from '@/app/store';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { removeFromCart } from '@/app/cartSlice';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/atoms/sheet';
import CartQuantityCounter from '../atoms/CartQuantityCounter';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative cursor-pointer">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 rounded-full bg-black text-white text-xs">
            {cartItems.length}
          </span>
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
              <Link to={`/products/${item.id}`} onClick={() => setOpen(false)}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 rounded-xl object-contain"
                />
              </Link>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    to={`/products/${item.id}`}
                    onClick={() => setOpen(false)}
                  >
                    <h3 className="font-semibold text-base">{item.title}</h3>
                  </Link>

                  <p className="text-sm text-muted-foreground mt-1">
                    {item.category}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 gap-2 md:gap-0">
                  <div className="flex gap-4 items-center">
                    <p className="text-lg font-bold">{`$${item.price.toFixed(2)}`}</p>

                    <div className="flex items-center gap-3">
                      <CartQuantityCounter productId={item.id} />
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
