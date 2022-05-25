/*
  Warnings:

  - The primary key for the `Station` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StationsFavoredByUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `favoritedById` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stopId` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Station` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postedById_fkey";

-- DropForeignKey
ALTER TABLE "StationsFavoredByUsers" DROP CONSTRAINT "StationsFavoredByUsers_stationId_fkey";

-- DropForeignKey
ALTER TABLE "StationsFavoredByUsers" DROP CONSTRAINT "StationsFavoredByUsers_userId_fkey";

-- AlterTable
ALTER TABLE "Station" DROP CONSTRAINT "Station_pkey",
ADD COLUMN     "favoritedById" INTEGER NOT NULL,
ADD COLUMN     "stopId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Station_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "StationsFavoredByUsers";

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_favoritedById_fkey" FOREIGN KEY ("favoritedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
