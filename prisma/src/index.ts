import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  // const client = new Client({
  //   host: "localhost",
  //   port: 5432,
  //   user: "postgres",
  //   password: "postgres",
  //   database: "activity-roles",
  // });

  console.time("write 100 000 rows");

  for (let i = 0; i < 100000; i++) {
    await prisma.activityStats.create({
      data: {
        guildID: "10554780760138179" + i,
        name: "Minecraft 1.18.2",
        count: 1,
      },
    });
  }

  console.timeEnd("write 100 000 rows");

  console.time("select 100 000 rows");

  for (let i = 0; i < 100000; i++) {
    await prisma.activityStats.findUnique({
      where: { guildID: "10554780760138179" + i },
    });
  }

  console.timeEnd("select 100 000 rows");

  await prisma.$disconnect();
}

main();
