import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/atoms/sheet';

import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';

const Cart = () => {
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

        <div className="flex-1 overflow-y-auto py-2">
          <div className="flex gap-4 border rounded-2xl p-4">
            <img
              src=""
              alt="Product"
              className="w-24 h-24 rounded-xl object-cover"
            />

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-base line-clamp-1">Name</h3>

                <p className="text-sm text-muted-foreground mt-1">Category</p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="space-y-3">
                  <p className="text-lg font-bold">$129.99</p>

                  <div className="flex items-center gap-3">
                    <button className="w-8 h-8 rounded-md border flex items-center justify-center hover:bg-gray-100 transition cursor-pointer">
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="text-sm font-medium">1</span>

                    <button className="w-8 h-8 rounded-md border flex items-center justify-center hover:bg-gray-100 transition cursor-pointer">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button className="text-red-500 transition cursor-pointer">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-5 px-4 mb-10">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium">Total</p>

            <p className="text-2xl font-bold">$129.99</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
