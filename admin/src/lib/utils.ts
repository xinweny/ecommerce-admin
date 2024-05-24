import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCountryName(countryCode: string) {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  return regionNames.of(countryCode);
}