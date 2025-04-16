import { PrismaClient, RoleName } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Entering into seed file.......🤞');
  await prisma.role.createMany({
    data: [
      {
        role_name: RoleName.ISSUER,
      },
      {
        role_name: RoleName.BIDDER,
      },
    ],
  });
}

main()
  .then(async () => {
    console.log('Seeded successfully.....🙏');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
