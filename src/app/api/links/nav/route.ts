import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

import { TData } from '@/types';

export async function GET() {
  const data: TData = await fs
    .readFile(process.cwd() + '/src/data/db.json', 'utf-8')
    .then(JSON.parse);

  let headerLinks = data.nav_links;

  if (!data || !headerLinks) {
    return NextResponse.json({ error: 'No data found' }, { status: 404 });
  }

  return NextResponse.json({ nav_links: headerLinks });
}
