import { Link } from 'react-router-dom';
import { Badge } from '../atoms/badge';
import { Button } from '../atoms/button';
import { Card, CardContent, CardHeader } from '../atoms/card';
import RatingStars from '../atoms/rating';
import type { Product } from '@/types/product';
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '@/app/wishlistSlice';
import type { RootState } from '@/app/store';
import { toast } from 'sonner';
import { addToCart } from '@/app/cartSlice';

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

  const wishlistProduct = useSelector(
    (state: RootState) => state.wishlist.items,
  );

  const existsInWishlist = wishlistProduct.find(
    (item) => item.id === product.id,
  );

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (existsInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.info('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist');
    }
  };

  return (
    <div>
      <Link to={`/products/${product.id}`}>
        <Card className="w-full h-full overflow-hidden py-0 gap-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <CardHeader className="p-0 relative">
            <img
              src={product.image}
              alt={product.title}
              className="h-52 w-full object-contain transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              <Badge>{product.category}</Badge>
            </div>
            <div className="absolute top-3 right-3">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={handleWishlist}
              >
                {existsInWishlist ? (
                  <Heart className="text-red-500 fill-red-500" />
                ) : (
                  <Heart />
                )}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 mb-4">
            <h2 className="text-lg font-semibold min-h-14">{product.title}</h2>

            <p className="text-xl font-bold">${product.price}</p>

            <div className="flex items-center gap-2 text-xs">
              <RatingStars rating={product.rating.rate} />
              <p className="text-gray-600">{`(${product.rating.count})`}</p>
            </div>

            <div className="mt-5">
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
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default ProductCard;
