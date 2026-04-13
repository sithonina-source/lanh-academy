'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function registerUser(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || password?.length < 6) {
    return { error: 'Vui lòng điền đủ thông tin và mật khẩu ít nhất 6 ký tự.' };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return { error: 'Email này đã được sử dụng. Vui lòng đăng nhập.' };
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      role: 'USER' // Luôn khởi tạo là sinh viên
    }
  });

  const cookieStore = await cookies();
  cookieStore.set('user_session', JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }), { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  });

  redirect('/');
}
