/*
  Warnings:

  - The primary key for the `Station` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StationsFavoredByUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "StationsFavoredByUsers" DROP CONSTRAINT "StationsFavoredByUsers_stationId_fkey";

-- AlterTable
ALTER TABLE "Station" DROP CONSTRAINT "Station_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Station_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StationsFavoredByUsers" DROP CONSTRAINT "StationsFavoredByUsers_pkey",
ALTER COLUMN "stationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StationsFavoredByUsers_pkey" PRIMARY KEY ("userId", "stationId");

-- AddForeignKey
ALTER TABLE "StationsFavoredByUsers" ADD CONSTRAINT "StationsFavoredByUsers_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
