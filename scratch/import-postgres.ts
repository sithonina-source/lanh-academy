import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing data to PostgreSQL...');

  const data = JSON.parse(fs.readFileSync('scratch/dump.json', 'utf-8'));

  // Import Users
  if (data.users && data.users.length > 0) {
    try {
      await prisma.user.createMany({ data: data.users, skipDuplicates: true });
      console.log('Users imported.');
    } catch (e) {
      console.log('Error importing users:', e);
    }
  }

  // Import Courses
  if (data.courses && data.courses.length > 0) {
    try {
      await prisma.course.createMany({ data: data.courses, skipDuplicates: true });
      console.log('Courses imported.');
    } catch (e) {
      console.log('Error importing courses:', e);
    }
  }

  // Import Blogs
  if (data.blogs && data.blogs.length > 0) {
    try {
      await prisma.blog.createMany({ data: data.blogs, skipDuplicates: true });
      console.log('Blogs imported.');
    } catch (e) {
      console.log('Error importing blogs:', e);
    }
  }

  // Import Modules
  if (data.modules && data.modules.length > 0) {
    try {
      await prisma.module.createMany({ data: data.modules, skipDuplicates: true });
      console.log('Modules imported.');
    } catch (e) {
      console.log('Error importing modules:', e);
    }
  }

  // Import Lessons
  if (data.lessons && data.lessons.length > 0) {
    try {
      await prisma.lesson.createMany({ data: data.lessons, skipDuplicates: true });
      console.log('Lessons imported.');
    } catch (e) {
      console.log('Error importing lessons:', e);
    }
  }

  // Import Orders
  if (data.orders && data.orders.length > 0) {
    try {
      await prisma.order.createMany({ data: data.orders, skipDuplicates: true });
      console.log('Orders imported.');
    } catch (e) {
      console.log('Error importing orders:', e);
    }
  }

  console.log('Import completed!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
