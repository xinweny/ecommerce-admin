interface ProductsLayoutProps {
  children: React.ReactNode;
}

export default async function ProductsLayout({
  children,
}: ProductsLayoutProps) {
  return (
    <div className="space-y-4">
      {children}
    </div>
  );
}