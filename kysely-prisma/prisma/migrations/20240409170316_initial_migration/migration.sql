-- CreateTable
CREATE TABLE "activityStats" (
    "guildID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "activityStats_pkey" PRIMARY KEY ("guildID")
);
