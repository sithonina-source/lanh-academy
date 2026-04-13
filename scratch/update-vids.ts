import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.findFirst({
    where: { title: { contains: 'Mosaic Học' } },
    include: {
      modules: {
        include: { lessons: true },
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  if (!course) {
    console.log('Course not found');
    return;
  }

  const urls = [
    'https://www.youtube.com/watch?v=tKmg3p41EpI',
    'https://www.youtube.com/shorts/ysh5Whd7IKE',
    'https://www.youtube.com/shorts/CtI5P5_Z7V8'
  ];

  let urlIndex = 0;
  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      if (urlIndex < urls.length) {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: { videoUrl: urls[urlIndex] }
        });
        urlIndex++;
      }
    }
  }

  console.log('Updated video URLs for test course');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
