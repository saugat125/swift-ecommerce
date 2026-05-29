import { Skeleton } from '../atoms/skeleton';

const ProductCardSkeleton = () => {
  return (
    <div className="space-y-3">
      <Skeleton className="h-52 w-full rounded-md" />

      <Skeleton className="h-4 w-3/4" />

      <Skeleton className="h-4 w-1/3" />

      <Skeleton className="h-3 w-1/2" />

      <Skeleton className="h-9 w-1/3" />
    </div>
  );
};

export default ProductCardSkeleton;
