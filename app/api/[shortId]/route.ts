import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch'; // Ensure you have node-fetch installed

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: any) {
  const { shortId } = params;

  // Fetch the original URL from the database
  const shortUrl = await prisma.shortUrl.findUnique({
    where: { shortId },
  });

  if (shortUrl) {
    // Fetch the content from the original URL
    const response = await fetch(shortUrl.originalUrl);

    // Get the content-type from the response (HTML, JSON, etc.)
    const contentType = response.headers.get('content-type');

    // Get the response body
    const body = await response.text();

    // Return the content as a NextResponse while preserving the short URL in the browser
    return new NextResponse(body, {
      headers: {
        'Content-Type': contentType || 'text/html',
      },
    });
  } else {
    return NextResponse.json({ error: 'URL not found' }, { status: 404 });
  }
}
