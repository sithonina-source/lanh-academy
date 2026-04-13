import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding test course...');

  const course = await prisma.course.create({
    data: {
      slug: 'workshop-mosaic-kiem-30tr-thang',
      title: 'Workshop Mosaic Học xong kiếm 30tr/ tháng',
      category: 'Mosaic',
      instructor: 'Lành Workshop',
      duration: '1 Tuần',
      level: 'Cơ bản',
      lessonsCount: 3,
      price: 2000,
      description: 'Khóa học test luồng thanh toán SePay 2.000đ. Đảm bảo học xong kiếm 30tr/tháng!',
      imageUrl: '/about_lanh_academy_workshop.png', // Tạm dùng ảnh có sẵn trong hệ thống
      modules: {
        create: [
          {
            title: 'Module 1: Nhập môn Mosaic',
            lessons: {
              create: [
                {
                  title: 'Bài 1: Tổng quan',
                  videoUrl: 'https://www.youtube.com/watch?v=tKmg3p41EpI',
                }
              ]
            }
          },
          {
            title: 'Module 2: Thực hành',
            lessons: {
              create: [
                {
                  title: 'Bài 2: Thực hành cơ bản',
                  videoUrl: 'https://www.youtube.com/shorts/ysh5Whd7IKE',
                }
              ]
            }
          },
          {
            title: 'Module 3: Kiếm 30 triệu',
            lessons: {
              create: [
                {
                  title: 'Bài 3: Bí kíp nghìn đơn',
                  videoUrl: 'https://www.youtube.com/shorts/CtI5P5_Z7V8',
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('Created test course:', course.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
