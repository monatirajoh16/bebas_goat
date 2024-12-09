import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const { searchParams, pathname } = new URL(req.url);

    // Jalankan middleware ini hanya untuk path /dashboard
    if (pathname === '/dashboard') {
        const callbackUrl = searchParams.get('callbackUrl');

        if (callbackUrl) {
            try {
                const targetPath = new URL(callbackUrl).pathname;
                return NextResponse.redirect(new URL(targetPath, req.url));
            } catch (error) {
                console.error("URL tidak valid:", error);
                return new NextResponse("URL tidak valid.", { status: 400 });
            }
        }
    }

    return NextResponse.next();
}

