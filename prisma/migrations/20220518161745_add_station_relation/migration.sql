-- CreateTable
CREATE TABLE "Station" (
    "id" SERIAL NOT NULL,
    "stopId" TEXT NOT NULL,
    "favoritedById" INTEGER NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_favoritedById_fkey" FOREIGN KEY ("favoritedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
