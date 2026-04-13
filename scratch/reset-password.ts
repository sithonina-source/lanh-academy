import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.updateMany({
    where: { email: { in: ['admin@lanh.com', 'sitho.nina@gmail.com'] } },
    data: { password: '12345678' }
  });
  
  console.log('Successfully reset passwords for both accounts to plain 12345678');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
