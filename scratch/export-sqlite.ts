import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log('Exporting data from SQLite...');
  const users = await prisma.user.findMany();
  const courses = await prisma.course.findMany();
  const blogs = await prisma.blog.findMany();
  const modules = await prisma.module.findMany();
  const lessons = await prisma.lesson.findMany();
  const orders = await prisma.order.findMany();

  const data = {
    users,
    courses,
    blogs,
    modules,
    lessons,
    orders
  };

  fs.writeFileSync('scratch/dump.json', JSON.stringify(data, null, 2));
  console.log('Exported successfully to scratch/dump.json');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
