interface HeadingProps {
  title: string;
  description?: string;
}

export function Heading({
  title,
  description,
}: HeadingProps) {
  return (
    <div className="text-3xl font-bold tracking-tight">
      <h2>{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}