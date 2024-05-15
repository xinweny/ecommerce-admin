import { ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Currency } from "@/components/shared/currency";
import { ReviewSummaryFull } from "@/components/shared/review-summary";

import { ProductItemIncludePayload, ProductIncludePayload } from "@/db/query/product";

interface ProductInfoProps {
  product: ProductIncludePayload;
  productItem: ProductItemIncludePayload;
  setProductItem: React.Dispatch<React.SetStateAction<ProductItemIncludePayload>>;
}

export function ProductInfo({
  product,
  productItem,
  setProductItem,
}: ProductInfoProps) {
  const {
    brand,
    productItems,
    reviews,
  } = product;

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 space-y-4">
      <div className="space-y-2 mb-10">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <span className="flex items-center justify-between">
          <span>{brand.name}</span>
          <span>{product.model}</span>
        </span>
        <ReviewSummaryFull aggregate={reviews} />
      </div>
      <div className="flex flex-col">
        <Currency className="block text-2xl text-gray-900" value={productItem.price} />
        <span className="font-bold mt-4 mb-2">{productItem.name}</span>
        <div className="flex items-center gap-2">
          {productItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => { setProductItem(item); }}
              size="sm"
              className={cn(
                "rounded-lg px-4",
                productItem.id === item.id && "border-black border-2"
              )}
              variant="outline"
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-10 flex items-center gap-3">
        <Button className="flex items-center gap-2 rounded-full">
          <span>Add to Cart</span>
          <ShoppingCart />
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Description</span>
        <p className="text-sm">{product.description}</p>
      </div>
    </div>
  );
}