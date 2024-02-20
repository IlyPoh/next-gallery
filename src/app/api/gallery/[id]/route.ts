import { join } from 'path';
import { unlink } from 'fs/promises';
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

  return NextResponse.json({ data: { image: image } });
}

export async function DELETE(
  _req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  connectMongoDB();
  const image = await Image.findOneAndDelete({ id: params.id });

  if (!image)
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });

  await unlink(join(process.cwd(), '/public/', image.imageSrc));

  return NextResponse.json({
    success: true,
    message: 'Image successfully deleted. Redirecting...',
  });
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { title } = await req.json();
  connectMongoDB();
  const image = await Image.findOneAndUpdate(
    { id: params.id },
    { title: title }
  );

  if (!image)
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });

  return NextResponse.json({
    success: true,
    message: 'Image successfully updated. Updating the page...',
  });
}
