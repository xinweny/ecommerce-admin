import { NextRequest, NextResponse } from "next/server";

import { getSeriesByBrandId } from "@/db/query/series";

export async function GET(req: NextRequest) {
  const brandId = req.nextUrl.searchParams.get("brandId");

  if (!brandId) return NextResponse.json({ data: [] }, { status: 400 });

  const series = await getSeriesByBrandId(+brandId);

  return NextResponse.json({ data: series });
}