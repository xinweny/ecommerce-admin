import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Route } from "next";
import qs from "qs";

interface QueryParams {
  [key: string]: string | Object | null;
}

export const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getQueryParams = useCallback(() => {
    return qs.parse(searchParams.toString());
  }, [searchParams]);
 
  const createQueryString = useCallback(
    (values: QueryParams) => { 
      return `${pathname}?${qs.stringify(values, { skipNulls: true })}`;
    },
    [pathname]
  );

  const navigateQueryString = useCallback(
    (values: QueryParams) => {
      router.push(createQueryString(values) as Route);
    },
    [createQueryString, router]
  );
  
  return {
    getQueryParams,
    createQueryString,
    navigateQueryString,
  };
}