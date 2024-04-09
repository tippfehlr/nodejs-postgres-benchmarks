CREATE TABLE IF NOT EXISTS "activityStats" (
	"guild_id" varchar(40) PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"count" integer
);
