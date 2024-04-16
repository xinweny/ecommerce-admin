import { NextRequest, NextResponse } from "next/server";

import { getSubcategoriesByCategoryId } from "@/db/query/subcategory";

export async function GET(req: NextRequest) {
  const categoryId = req.nextUrl.searchParams.get("categoryId");

  if (!categoryId) return NextResponse.json({ data: [] }, { status: 400 });

  const subcategories = await getSubcategoriesByCategoryId(+categoryId);

  return NextResponse.json({ data: subcategories });
}