import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
}

export function CardWrapper({ children, headerLabel }: CardWrapperProps) {
  return (
    <Card>
      <CardHeader>{headerLabel}</CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}