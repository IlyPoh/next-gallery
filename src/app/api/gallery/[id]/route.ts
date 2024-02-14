import { NextResponse } from 'next/server';

import connectMongoDB from '@/libs/mongodb';
import Image from '@/models/image';

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  connectMongoDB();
  const image = await Image.findOne({ id: params.id });

  if (!image)
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });

  return NextResponse.json({ image: image });
}
