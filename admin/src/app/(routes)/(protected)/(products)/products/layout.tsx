import { ProductsBreadcrumb } from "./_components/products-breadcrumb";

interface ProductsLayoutProps {
  children: React.ReactNode;
}

export default async function ProductsLayout({
  children,
}: ProductsLayoutProps) {
  return (
    <div className="grow flex flex-col gap-4 h-full">
      <ProductsBreadcrumb />
      {children}
    </div>
  );
}