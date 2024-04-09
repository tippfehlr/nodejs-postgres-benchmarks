import { DB } from "./db.types";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: "localhost",
      user: "postgres",
      password: "postgres",
      database: "activity-roles",
      max: 1,
    }),
  }),
});

async function main() {
  console.time("write 100 000 rows");

  for (let i = 0; i < 100000; i++) {
    await db
      .insertInto("activityStats")
      .values({
        guildID: "10554780760138179" + i,
        name: "Minecraft 1.18.2",
        count: 1,
      })
      .execute();
  }

  console.timeEnd("write 100 000 rows");

  console.time("select 100 000 rows");

  for (let i = 0; i < 100000; i++) {
    await db
      .selectFrom("activityStats")
      .where("guildID", "=", "10554780760138179" + i)
      .executeTakeFirst();
  }

  console.timeEnd("select 100 000 rows");

  db.destroy();
}

main();
