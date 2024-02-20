import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import User from '@/models/user';

import connectMongoDB from '@/libs/mongodb';

import { authOptions } from '@/utils/authOptions';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  connectMongoDB();
  const user = await User.findOne({ email: session?.user?.email });

  if (user) {
    return NextResponse.json({ data: { user: user } });
  }

  User.create({
    id: uuidv4(),
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
  });

  return NextResponse.json({ data: { user: session?.user } });
}
