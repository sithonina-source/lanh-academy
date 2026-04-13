import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.updateMany({
    data: { password: '12345678' }
  });
  
  const users = await prisma.user.findMany();
  console.log('Reset passwords successfully. Current users:', users.map(u => ({ email: u.email, pass: u.password })));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
