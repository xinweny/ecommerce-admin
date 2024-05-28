interface BillboardProps {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
}

export function Billboard({
  title,
  description,
  imageUrl,
}: BillboardProps) {
  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden ">
        <div
          className="h-full w-full rounded-xl aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover bg-blue-200"
          style={{
            backgroundImage: `url(${imageUrl
              ? imageUrl
              : "#"})`,
            filter: "brightness(50%)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white space-y-4 lg:space-y-8 text-center drop-shadow-lg">
          <h1 className="font-bold text-2xl sm:text-4xl lg:text-5xl sm:max-w-xl max-w-xs">{title}</h1>
          {description && <p className="text-lg sm:text-md lg:text-2xl sm:max-w-xl">{description}</p>}
        </div>
      </div>
    </div>
  );
}