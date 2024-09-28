import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { originalUrl } = await req.json();

  if (!originalUrl) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  // Create a unique shortId
  const shortId = nanoid(8);

  // Save to the database
  const newShortUrl = await prisma.shortUrl.create({
    data: {
      shortId,
      originalUrl,
    },
  });

  return NextResponse.json(newShortUrl);
}
