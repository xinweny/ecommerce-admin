interface FormHeaderProps {
  title: string;
  description: string;
}

export function FormHeader({
  title,
  description
}: FormHeaderProps) {
  return (
    <div className="text-3xl font-bold tracking-tight">
      <h2>{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}