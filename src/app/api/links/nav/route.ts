import { NextResponse } from 'next/server';

import connectMongoDB from '@/libs/mongodb';

import NavLinks from '@/models/navLink';

import { TLink } from '@/types';

export async function GET() {
  connectMongoDB();
  let data: TLink[] = await NavLinks.find();

  if (!data) {
    return NextResponse.json({ error: 'No data found' }, { status: 404 });
  }

  return NextResponse.json({ data: { nav_links: data } });
}
