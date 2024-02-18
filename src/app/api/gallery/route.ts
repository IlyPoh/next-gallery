import { join } from 'path';
import { env } from 'process';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

import connectMongoDB from '@/libs/mongodb';

import Image from '@/models/image';

import { TImage } from '@/types';

import { getImageType } from '@/utils/helpers';

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

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const file: File | null = data.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file found' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const id = uuidv4();

  const imagePath = `/images/${id}.${getImageType(file.type)}`;
  await writeFile(join(process.cwd(), '/public/', imagePath), buffer);

  connectMongoDB();
  const newImage = new Image({
    id: id,
    title: data.get('title') as string,
    imageSrc: imagePath,
    userId: data.get('userId') as string,
  });

  await newImage.save();

  return NextResponse.json({ success: true, message: 'Image added' });
}
