interface CategoryPageProps {
  params: { categoryId: string };
}

export default async function CategoryPage({
  params: { categoryId },
}: CategoryPageProps) {
  return (
    <div>{categoryId}</div>
  );
}