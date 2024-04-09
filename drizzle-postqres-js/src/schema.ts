import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const activityStats = pgTable("activityStats", {
  guildID: varchar("guild_id", { length: 40 }).primaryKey(),
  name: varchar("name", { length: 256 }),
  count: integer("count"),
});
