import { Client } from "pg";

async function main() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "activity-roles",
  });
  client.connect();

  await client.query(
    'CREATE TABLE activityStats ("guild_id" VARCHAR(40) PRIMARY KEY, "name" VARCHAR(256), "count" INTEGER);',
  );

  console.time("write 100 000 rows");

  for (let i = 0; i < 100000; i++) {
    await client.query(
      `INSERT INTO activityStats VALUES ('10554780760138179${i}', 'Minercaft 1.18.2', 1)`,
    );
  }

  console.timeEnd("write 100 000 rows");

  console.time("select 100 000 rows");

  for (let i = 0; i < 100000; i++) {
    await client.query(
      `SELECT * FROM activityStats WHERE guild_id = '10554780760138179${i}'`,
    );
  }

  console.timeEnd("select 100 000 rows");

  client.end();
}

main();
