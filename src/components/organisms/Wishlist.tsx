import type { RootState } from '@/app/store';
import { removeFromWishlist } from '@/app/wishlistSlice';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/atoms/sheet';

import { Heart, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Button } from '../atoms/button';
import { addToCart } from '@/app/cartSlice';

const Wishlist = () => {
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.wishlist.items);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative cursor-pointer">
          <Heart className="w-6 h-6" />
          {/* <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-black text-white text-xs">
            {products.length}
          </span> */}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-2xl font-semibold">
            My Wishlist
          </SheetTitle>

          <SheetDescription>Your saved favorite products</SheetDescription>
        </SheetHeader>

        {products.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            No products in wishlist.
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-2 space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex gap-4 border rounded-xl p-3">
              <img
                src={product.image}
                alt={product.title}
                className="w-24 h-24 rounded-lg object-contain bg-white"
              />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-base">{product.title}</h3>

                  <p className="text-sm text-muted-foreground mt-1 capitalize">
                    {product.category}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold">${product.price}</span>
                  <Button
                    variant="ghost"
                    className="text-sm font-semibold hover:bg-white cursor-pointer text-gray-800 hover:text-black transition duration-200"
                    onClick={() => {
                      dispatch(addToCart({ ...product, quantity: 1 }));
                      toast.success('Added to cart');
                    }}
                  >
                    Add to cart
                  </Button>

                  <button
                    onClick={() => {
                      dispatch(removeFromWishlist(product.id));
                      toast.info('Removed from wishlist');
                    }}
                    className="text-sm text-red-500 transition cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5 mr-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Wishlist;
