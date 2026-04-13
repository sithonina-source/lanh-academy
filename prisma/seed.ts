import { PrismaClient } from '@prisma/client';
import { mockCourses } from '../src/data/mock';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  try {
    for (const course of mockCourses) {
      const existingCourse = await prisma.course.findUnique({
        where: { slug: course.slug }
      });

      if (!existingCourse) {
        await prisma.course.create({
          data: {
            id: course.id,
            slug: course.slug,
            title: course.title,
            category: course.category,
            instructor: course.instructor,
            duration: course.duration,
            level: course.level,
            lessonsCount: course.lessonsCount,
            price: course.price,
            discountPrice: null,
            imageUrl: course.imageUrl,
            description: course.description,
          }
        });
        console.log(`Created course: ${course.title}`);
      } else {
        console.log(`Course ${course.title} already exists. Skipping.`);
      }
    }

    // Seed default Admin user
    const adminEmail = 'admin@lanh.com';
    const adminExists = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!adminExists) {
      await prisma.user.create({
        data: {
          name: 'Admin Lành Academy',
          email: adminEmail,
          password: 'password123', // Demo raw password, will use bcrypt in production
          role: 'ADMIN'
        }
      });
      console.log('Created default admin user (admin@lanh.com / password123)');
    }

    // Seed Blogs (Hardcoded exactly as shown in frontend)
    const blog1 = await prisma.blog.findFirst({ where: { title: 'Top 5 loại sáp làm nến thơm an toàn cho sức khỏe' }});
    if (!blog1) {
      await prisma.blog.create({
        data: {
          title: 'Top 5 loại sáp làm nến thơm an toàn cho sức khỏe',
          excerpt: 'Mùi hương định hình không gian sống, nhưng độ an toàn của sáp nến mới là yếu tố quan trọng nhất. Cùng Lành tìm hiểu nhé.',
          content: 'Nội dung chi tiết blog 1',
          tag: 'Nến thơm',
          imageUrl: '491271846_122221522208040203_9122635507575025973_n.jpg'
        }
      });
      await prisma.blog.create({
        data: {
          title: 'Hướng dẫn đan Macrame trang trí tường phong cách Boho',
          excerpt: 'Chỉ với chiếc dây thừng cotton và vài nút thắt cơ bản, bạn có thể biến bức tường trống trải thành điểm nhấn nghệ thuật.',
          content: 'Nội dung chi tiết blog 2',
          tag: 'Macrame',
          imageUrl: '491920804_122221522262040203_6298781457854458016_n.jpg'
        }
      });
      await prisma.blog.create({
        data: {
          title: 'Bí quyết pha màu Resin Art trong suốt như pha lê',
          excerpt: 'Lỗi thường gặp nhất của người mới chơi Resin Art là bọt khí và màu bị đục. Bài viết này sẽ giúp bạn khắc phục triệt để.',
          content: 'Nội dung chi tiết blog 3',
          tag: 'Resin',
          imageUrl: '528557863_122179504916393433_3501995056418838829_n.jpg'
        }
      });
      console.log('Created 3 initial blogs.');
    }

    console.log('✅ Seeding completed.');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
