import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Route } from "next";

interface QueryParams {
  [key: string]: string | null;
}

export const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getQueryString = useCallback(() => {
    return new URLSearchParams(searchParams.toString());
  }, [searchParams]);
 
  const createQueryString = useCallback(
    (values: QueryParams) => {
      const params = getQueryString();

      Object.entries(values).forEach(([key, value]) => {
        value
          ? params.set(key, value)
          : params.delete(key);
      });
 
      return `${pathname}?${params.toString()}`;
    },
    [getQueryString, pathname]
  );

  const navigateQueryString = useCallback(
    (values: QueryParams) => {
      router.push(createQueryString(values) as Route);
    },
    [createQueryString, router]
  );
  
  return {
    getQueryString,
    createQueryString,
    navigateQueryString,
  };
}