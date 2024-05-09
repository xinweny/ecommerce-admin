import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";

interface ProductPageCardProps {
  children: React.ReactNode;
}

export function ProductPageCard({
  children,
}: ProductPageCardProps) {
  return (
    <Card className="p-8">
      {children}
    </Card>
  );
}

interface ProductPageCardHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function ProductPageCardHeading({
  children,
  className,
}: ProductPageCardHeadingProps) {
  return (
    <h3
      className={cn(
        "font-semibold text-xl",
        className
      )}
    >
      {children}
    </h3>
  );
}