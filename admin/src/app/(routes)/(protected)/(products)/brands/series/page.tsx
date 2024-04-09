import { getQueriedSeries, getSeriesCount } from "@/db/query/series";

import { SeriesClient } from "./_components/series-client";


interface SeriesPageProps {
  searchParams: {
    id?: string;
    page?: string;
    limit?: string;
    name?: string;
    slug?: string;
    query?: string;
  }
}

export default async function SeriesPage({
  searchParams: {
    page,
    limit,
    id,
    name,
    slug,
    query,
  },
}: SeriesPageProps) {
  const [series, totalCount] = await Promise.all([
    getQueriedSeries({
      pagination: { page, limit },
      sort: { id, name, slug },
      filter: {
        name: query,
        mode: "insensitive",
      }
    }),
    getSeriesCount(),
  ]);

  return (
    <SeriesClient
      series={series}
      totalCount={totalCount}
    />
  );
}