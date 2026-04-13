import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bảo vệ route /admin
  if (pathname.startsWith('/admin')) {
    // Cho phép truy cập trang login mà không cần chuyển hướng
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const adminSession = request.cookies.get('admin_session');
    if (!adminSession) {
      // Chuyển hướng về trang đăng nhập nếu chưa có session
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  // Phase 3: Bảo vệ route /khoa-hoc-cua-toi, v.v.. sau này thêm vào đây

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
