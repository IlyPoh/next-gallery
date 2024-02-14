import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import connectMongoDB from '@/libs/mongodb';

import User from '@/models/user';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  connectMongoDB();
  const user = await User.findOne({ email: session?.user?.email });

  if (user) {
    return NextResponse.json({ user: user });
  }

  User.create({
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
  });

  return NextResponse.json({ user: session?.user });
}
