import { CategoryIncludePayload } from "@/db/query/category";

interface CategoryBillboardProps {
  category: CategoryIncludePayload;
}

export function CategoryBillboard({
  category,
}: CategoryBillboardProps) {
  const { name, billboard } = category;

  return (
    <div className="space-y-4 p-4 sm:p-6 lg:p-8">
      <div className="relative rounded-xl overflow-hidden ">
        <div
          className="h-full w-full rounded-xl aspect-square md:aspect-[2.4/1 overflow-hidden bg-cover"
          style={{
            backgroundImage: `url(${billboard
              ? billboard.imageUrl
              : "#"})`,
            filter: "brightness(75%)",
          }}
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl sm:text-4xl lg:text-5xl sm:max-w-xl max-w-xs drop-shadow-lg">{name}</h1>
      </div>
      {billboard && <p className="text-sm">{billboard.description}</p>}
    </div>
  );
}