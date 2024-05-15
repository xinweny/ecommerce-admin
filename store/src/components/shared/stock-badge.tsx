import { Badge } from "@/components/ui/badge";

interface StockBadgeProps {
  stock: number;
}

export function StockBadge({
  stock,
}: StockBadgeProps) {
  return stock > 0
    ? (
      <Badge className="bg-green-600">In Stock</Badge>
    )
    : (
      <Badge variant="destructive">Out of Stock</Badge>
    );
}