'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCourse(formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const category = formData.get('category') as string;
  const duration = formData.get('duration') as string;
  const level = formData.get('level') as string;
  const lessonsCount = parseInt(formData.get('lessonsCount') as string) || 0;
  const price = parseInt(formData.get('price') as string) || 0;
  const discountPriceRaw = formData.get('discountPrice') as string;
  const discountPrice = discountPriceRaw ? parseInt(discountPriceRaw) : null;
  
  const discountEndsAtRaw = formData.get('discountEndsAt') as string;
  const discountEndsAt = discountEndsAtRaw ? new Date(discountEndsAtRaw) : null;

  const imageUrl = formData.get('imageUrl') as string;
  const description = formData.get('description') as string;

  await prisma.course.create({
    data: {
      title, slug, category, duration, level, lessonsCount, price, discountPrice, discountEndsAt, imageUrl, description
    }
  });

  revalidatePath('/admin/courses');
  revalidatePath('/');
  redirect('/admin/courses');
}

export async function updateCourse(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const category = formData.get('category') as string;
  const duration = formData.get('duration') as string;
  const level = formData.get('level') as string;
  const lessonsCount = parseInt(formData.get('lessonsCount') as string) || 0;
  const price = parseInt(formData.get('price') as string) || 0;
  const discountPriceRaw = formData.get('discountPrice') as string;
  const discountPrice = discountPriceRaw ? parseInt(discountPriceRaw) : null;
  
  const discountEndsAtRaw = formData.get('discountEndsAt') as string;
  const discountEndsAt = discountEndsAtRaw ? new Date(discountEndsAtRaw) : null;

  const imageUrl = formData.get('imageUrl') as string;
  const description = formData.get('description') as string;

  await prisma.course.update({
    where: { id },
    data: {
      title, slug, category, duration, level, lessonsCount, price, discountPrice, discountEndsAt, imageUrl, description
    }
  });

  revalidatePath('/admin/courses');
  revalidatePath('/');
  redirect('/admin/courses');
}

export async function deleteCourse(id: string) {
  await prisma.course.delete({
    where: { id }
  });

  revalidatePath('/admin/courses');
  revalidatePath('/');
}

// === Curriculum Actions ===

export async function createModule(courseId: string, formData: FormData) {
  const title = formData.get('title') as string;
  if (!title) return;
  await prisma.module.create({
    data: { title, courseId }
  });
  revalidatePath(`/admin/courses/${courseId}/modules`);
}

export async function deleteModule(courseId: string, moduleId: string) {
  await prisma.module.delete({ where: { id: moduleId } });
  revalidatePath(`/admin/courses/${courseId}/modules`);
}

export async function createLesson(courseId: string, moduleId: string, formData: FormData) {
  const title = formData.get('title') as string;
  const videoUrl = formData.get('videoUrl') as string;
  const documentUrl = formData.get('documentUrl') as string;
  if (!title || !videoUrl) return;
  await prisma.lesson.create({
    data: { title, videoUrl, documentUrl, moduleId }
  });
  revalidatePath(`/admin/courses/${courseId}/modules`);
}

export async function deleteLesson(courseId: string, lessonId: string) {
  await prisma.lesson.delete({ where: { id: lessonId } });
  revalidatePath(`/admin/courses/${courseId}/modules`);
}

export async function updateLesson(courseId: string, lessonId: string, formData: FormData) {
  const title = formData.get('title') as string;
  const videoUrl = formData.get('videoUrl') as string;
  const documentUrl = formData.get('documentUrl') as string;
  if (!title || !videoUrl) return;
  await prisma.lesson.update({
    where: { id: lessonId },
    data: { title, videoUrl, documentUrl }
  });
  revalidatePath(`/admin/courses/${courseId}/modules`);
}

// === Blog Actions ===

export async function createBlog(formData: FormData) {
  const title = formData.get('title') as string;
  const tag = formData.get('tag') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const imageUrl = formData.get('imageUrl') as string;

  if (!title) return;

  await prisma.blog.create({
    data: { title, tag, excerpt, content, imageUrl }
  });

  revalidatePath('/admin/blogs');
  revalidatePath('/blog');
}

export async function updateBlog(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const tag = formData.get('tag') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const imageUrl = formData.get('imageUrl') as string;

  await prisma.blog.update({
    where: { id },
    data: { title, tag, excerpt, content, imageUrl }
  });

  revalidatePath('/admin/blogs');
  revalidatePath('/blog');
}

export async function deleteBlog(id: string) {
  await prisma.blog.delete({ where: { id } });
  revalidatePath('/admin/blogs');
  revalidatePath('/blog');
}
