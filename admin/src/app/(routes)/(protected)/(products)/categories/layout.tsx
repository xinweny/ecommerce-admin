import { CategoriesBreadcrumb } from "./_components/categories-breadcrumb";

interface CategoriesLayoutProps {
  children: React.ReactNode;
}

export default async function CategoriesLayout({
  children,
}: CategoriesLayoutProps) {
  return (
    <div className="space-y-4">
      <CategoriesBreadcrumb />
      {children}
    </div>
  );
}