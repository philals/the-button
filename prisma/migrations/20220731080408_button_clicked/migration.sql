/*
  Warnings:

  - You are about to drop the column `name` on the `ButtonClick` table. All the data in the column will be lost.
  - Added the required column `userId` to the `ButtonClick` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ButtonClick" DROP COLUMN "name",
ADD COLUMN     "userId" TEXT NOT NULL;
