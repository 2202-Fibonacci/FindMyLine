/*
  Warnings:

  - You are about to drop the column `favoritedById` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `stopId` on the `Station` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Station" DROP CONSTRAINT "Station_favoritedById_fkey";

-- AlterTable
ALTER TABLE "Station" DROP COLUMN "favoritedById",
DROP COLUMN "stopId",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Station_id_seq";

-- CreateTable
CREATE TABLE "StationsFavoredByUsers" (
    "userId" INTEGER NOT NULL,
    "stationId" INTEGER NOT NULL,

    CONSTRAINT "StationsFavoredByUsers_pkey" PRIMARY KEY ("userId","stationId")
);

-- AddForeignKey
ALTER TABLE "StationsFavoredByUsers" ADD CONSTRAINT "StationsFavoredByUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationsFavoredByUsers" ADD CONSTRAINT "StationsFavoredByUsers_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
