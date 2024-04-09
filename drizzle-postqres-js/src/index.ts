import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { activityStats } from "./schema";
import { eq } from "drizzle-orm";

async function main() {
  const client = postgres({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "activity-roles",
  });
  const db = drizzle(client);

  await migrate(db, { migrationsFolder: "drizzle" });

  console.time("write 100 000 rows");

  for (let i = 0; i < 100000; i++) {
    await db.insert(activityStats).values({
      guildID: "10554780760138179" + i,
      name: "Minecraft 1.18.2",
      count: 1,
    });
  }

  console.timeEnd("write 100 000 rows");

  console.time("select 100 000 rows");

  for (let i = 0; i < 100000; i++) {
    await db
      .select()
      .from(activityStats)
      .where(eq(activityStats.guildID, "10554780760138179" + i));
  }

  console.timeEnd("select 100 000 rows");

  client.end();
}

main();
