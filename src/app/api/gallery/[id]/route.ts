import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

import { images } from '@/data/images';

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  if (!params.id) redirect('/gallery');
  const image = images.find(image => image.id === params.id);
  return NextResponse.json(image);
}
