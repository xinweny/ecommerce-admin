import { BrandsBreadcrumb } from "./_components/brands-breadcrumb";

interface BrandsLayoutProps {
  children: React.ReactNode;
}

export default async function BrandsLayout({
  children,
}: BrandsLayoutProps) {
  return (
    <div className="space-y-4">
      <BrandsBreadcrumb />
      {children}
    </div>
  );
}