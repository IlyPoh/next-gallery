import { env } from 'process';
import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';

import { TData } from '@/types';

export async function GET(request: NextRequest) {
  const data: TData = await fs
    .readFile(process.cwd() + '/src/data/db.json', 'utf-8')
    .then(JSON.parse);
  let images = data.images;

  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get('page');
  const search = searchParams.get('search');

  if (search) {
    images = images.filter(image => {
      return image.title.toLowerCase().includes(search.toLowerCase());
    });
  }

  const pageCount = Math.ceil(images.length / env.ITEMS_PER_PAGE);

  const result = images.slice(
    (Number(page) - 1) * env.ITEMS_PER_PAGE,
    Number(page) * env.ITEMS_PER_PAGE
  );

  if (!data || !images) {
    return NextResponse.json({ error: 'No data found' }, { status: 404 });
  }

  return NextResponse.json({ images: result, totalPages: pageCount });
}
