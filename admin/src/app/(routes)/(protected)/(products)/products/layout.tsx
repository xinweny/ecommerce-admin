import { ProductsBreadcrumb } from "./_components/products-breadcrumb";

interface ProductsLayoutProps {
  children: React.ReactNode;
}

export default async function CategoriesLayout({
  children,
}: ProductsLayoutProps) {
  return (
    <div className="space-y-4">
      <ProductsBreadcrumb />
      {children}
    </div>
  );
}