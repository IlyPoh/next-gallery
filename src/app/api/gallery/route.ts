import { env } from 'process';
import { NextRequest, NextResponse } from 'next/server';

import { images } from '@/data/images';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get('page');
  const search = searchParams.get('search');

  let filteredImages = images;

  if (search) {
    filteredImages = images.filter(image => {
      return image.title.toLowerCase().includes(search.toLowerCase());
    });
  }

  const pageCount = Math.ceil(filteredImages.length / env.ITEMS_PER_PAGE);

  const result = filteredImages.slice(
    (Number(page) - 1) * env.ITEMS_PER_PAGE,
    Number(page) * env.ITEMS_PER_PAGE
  );

  return NextResponse.json({ images: result, totalPages: pageCount });
}
