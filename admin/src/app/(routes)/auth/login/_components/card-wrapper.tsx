import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  className?: string;
}

export function CardWrapper({
  children,
  headerLabel,
  className,
}: CardWrapperProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-center">{headerLabel}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}