import type { RootState } from '@/app/store';
import { removeFromWishlist } from '@/app/wishlistSlice';
import { Heart, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/atoms/sheet';
import AddToCartButton from '../atoms/AddToCartButton';

const Wishlist = () => {
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.wishlist.items);

  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative cursor-pointer">
          <Heart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 rounded-full bg-black text-white text-xs">
            {products.length}
          </span>
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
              <Link
                to={`/products/${product.id}`}
                onClick={() => setOpen(false)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-24 h-24 rounded-lg object-contain bg-white"
                />
              </Link>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    to={`/products/${product.id}`}
                    onClick={() => setOpen(false)}
                  >
                    <h3 className="font-semibold text-base">{product.title}</h3>
                  </Link>

                  <p className="text-sm text-muted-foreground mt-1 capitalize">
                    {product.category}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold">${product.price}</span>
                  <AddToCartButton product={product} />

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
