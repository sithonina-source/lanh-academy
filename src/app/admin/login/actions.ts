'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Vui lòng nhập đầy đủ thông tin.' };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.password !== password) {
    return { error: 'Email hoặc mật khẩu không chính xác.' };
  }

  if (user.role !== 'ADMIN' && user.role !== 'STAFF') {
    return { error: 'Tài khoản không có quyền truy cập hệ thống quản trị.' };
  }

  // Đặt cookie duy trì phiên đăng nhập 7 ngày (ở môi trường thật sẽ dùng JWT/Hash)
  const cookieStore = await cookies();
  cookieStore.set('admin_session', JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: user.permissions || '[]'
  }), { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 // 7 days
  });

  redirect('/admin');
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}
