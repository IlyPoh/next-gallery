import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

import { TData } from '@/types';

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const data: TData = await fs
    .readFile(process.cwd() + '/src/data/db.json', 'utf-8')
    .then(JSON.parse);
  let images = data.images;

  const image = images.find(image => {
    return image.id === params.id;
  });

  if (!image)
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });

  return NextResponse.json({ image: image });
}
