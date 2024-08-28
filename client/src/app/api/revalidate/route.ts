import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    console.log('🚀 ~ req:', new URL(req.url).searchParams.get('secret'));
    const searchParams = new URL(req.url).searchParams;

    const secret = searchParams.get('secret');
    const path = searchParams.get('path');
    // Check for secret to confirm this is a valid request
    if (secret && secret !== process.env['NEXT_PUBLIC_REVALIDATE_SECRET_TOKEN']) {
      return NextResponse.json({
        status: 400,
        revalidated: false,
        now: Date.now(),
        message: 'Invalid token'
      });
    }

    revalidatePath(path ?? '/');
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now()
    });
  } catch (error: any) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
