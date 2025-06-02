/*
  Warnings:

  - You are about to drop the column `classe_id` on the `points` table. All the data in the column will be lost.
  - Added the required column `class_id` to the `points` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "points" DROP CONSTRAINT "points_classe_id_fkey";

-- AlterTable
ALTER TABLE "points" DROP COLUMN "classe_id",
ADD COLUMN     "class_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "points" ADD CONSTRAINT "points_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
