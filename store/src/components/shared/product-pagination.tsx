"use client";

import { usePathname, useSearchParams } from "next/navigation";
import qs from "qs";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "../ui/pagination";

interface ProductPaginationProps extends React.ComponentProps<"nav"> {
  totalCount: number;
}

export function ProductPagination({
  totalCount,
  ...props
}: ProductPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 50;

  const totalPages = Math.ceil(totalCount / limit);

  const isWithinRange = page > 1 && page < totalPages;

  return (
    <Pagination {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${pathname}?${qs.stringify({
              page: (page - 1).toString(),
              limit: limit.toString(),
            })}`}
            aria-disabled={!isWithinRange}
            tabIndex={!isWithinRange ? -1 : undefined}
            className={!isWithinRange
              ? "pointer-events-none opacity-50"
              : undefined
            }
            />
        </PaginationItem>
        {Array.from(Array(totalPages).keys()).map(i => {
          const n = i + 1;

          return (
            <PaginationItem key={n}>
              <PaginationLink
                href={`${pathname}?${qs.stringify({
                  page: page.toString(),
                  limit: limit.toString(),
                })}`}
                isActive={page === n}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={`${pathname}?${qs.stringify({
              page: (page + 1).toString(),
              limit: limit.toString(),
            })}`}
            aria-disabled={!isWithinRange}
            tabIndex={!isWithinRange ? -1 : undefined}
            className={!isWithinRange
              ? "pointer-events-none opacity-50"
              : undefined
            }
            />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}