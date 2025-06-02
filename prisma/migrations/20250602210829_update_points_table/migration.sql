/*
  Warnings:

  - You are about to drop the `Points` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Points" DROP CONSTRAINT "Points_classe_id_fkey";

-- DropForeignKey
ALTER TABLE "Points" DROP CONSTRAINT "Points_item_id_fkey";

-- DropTable
DROP TABLE "Points";

-- CreateTable
CREATE TABLE "points" (
    "id" TEXT NOT NULL,
    "classe_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "points_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "points" ADD CONSTRAINT "points_classe_id_fkey" FOREIGN KEY ("classe_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "points" ADD CONSTRAINT "points_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
