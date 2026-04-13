'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createStaff(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string || '123456';
  
  // Móc các giá trị Checkbox
  const perms = [];
  if (formData.get('perm_courses')) perms.push('COURSES');
  if (formData.get('perm_orders')) perms.push('ORDERS');
  if (formData.get('perm_blogs')) perms.push('BLOGS');

  if (!name || !email) return { error: 'Vui lòng điền đủ Tên và Email' };

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: 'STAFF',
        permissions: JSON.stringify(perms)
      }
    });
  } catch (error) {
    return { error: 'Email này đã tồn tại trong hệ thống!' };
  }

  revalidatePath('/admin/staff');
  redirect('/admin/staff');
}

export async function deleteStaff(id: string) {
  await prisma.user.delete({ where: { id } });
  revalidatePath('/admin/staff');
}
