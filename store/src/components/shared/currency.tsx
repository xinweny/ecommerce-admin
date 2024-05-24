const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 2,
});

interface CurrencyProps {
  value: string | number;
  className?: string;
}

export function Currency({
  value,
  className,
}: CurrencyProps) {

  return (
    <span className={className}>
      {formatter.format(Number(value) / 100)}
    </span>
  );
}