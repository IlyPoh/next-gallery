import { env } from 'process';
import { NextRequest, NextResponse } from 'next/server';

import connectMongoDB from '@/libs/mongodb';

import Image from '@/models/image';

import { TImage } from '@/types';

export async function GET(request: NextRequest) {
  connectMongoDB();
  let images: TImage[] = await Image.find();

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

  if (!images) {
    return NextResponse.json({ error: 'No data found' }, { status: 404 });
  }

  return NextResponse.json({ images: result, totalPages: pageCount });
}
