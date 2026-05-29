import type { Product } from '@/types/product';
import { Badge } from '@/components/atoms/badge';
import { Card } from '@/components/atoms/card';
import RatingStars from '@/components/atoms/rating';
import { Button } from '../atoms/button';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/cartSlice';
import { toast } from 'sonner';

const ProductDetailsSection = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Card className="grid md:grid-cols-2 gap-10 p-6 border border-gray-200">
        <div className="flex items-center justify-center rounded-xl p-6 border border-gray-300 shadow-sm">
          <img
            src={product?.image}
            alt={product?.title}
            className="max-h-60 md:max-h-80 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="space-y-5 md:mt-10 mt-0">
          <Badge className="w-fit">{product?.category}</Badge>

          <h1 className="text-2xl md:text-3xl font-bold">{product?.title}</h1>

          <div className="flex gap-2">
            <RatingStars rating={product?.rating?.rate ?? 0} />
            <p className="text-xs text-gray-500">{` ${product?.rating?.count} reviews`}</p>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product?.description}
          </p>

          <p className="text-2xl md:text-3xl font-bold">${product?.price}</p>

          <div>
            <Button
              className="text-md bg-[#00bd32] cursor-pointer hover:scale-101 transition-transform duration-200"
              onClick={() => {
                dispatch(addToCart({ ...product, quantity: 1 }));
                toast.success('Added to cart');
              }}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetailsSection;
