-- AlterTable
CREATE SEQUENCE "station_id_seq";
ALTER TABLE "Station" ALTER COLUMN "id" SET DEFAULT nextval('station_id_seq');
ALTER SEQUENCE "station_id_seq" OWNED BY "Station"."id";
