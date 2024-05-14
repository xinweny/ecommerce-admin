import { ProductItem } from "@prisma/client";

interface ProductItemInfoProps {
  productItem: ProductItem;
}

export function ProductItemInfo({
  productItem,
}: ProductItemInfoProps) {
  return (
    <div>
      Info
    </div>
  );
}