import { Skeleton } from '../atoms/skeleton';
import { Card } from '@/components/atoms/card';

const ProductDetailsSkeleton = () => {
  return (
    <Card className="grid md:grid-cols-2 gap-10 p-6 border border-gray-200">
      <div className="flex items-center justify-center rounded-xl p-6 border border-gray-300">
        <Skeleton className="h-80 w-full" />
      </div>

      <div className="space-y-6 mt-10">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <Skeleton className="h-10 w-32" />
      </div>
    </Card>
  );
};

export default ProductDetailsSkeleton;
