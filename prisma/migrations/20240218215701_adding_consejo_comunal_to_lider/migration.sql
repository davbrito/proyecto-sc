/*
  Warnings:

  - Added the required column `consejoComunalId` to the `Lider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consejoComunalId` to the `LiderComunidad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lider` ADD COLUMN `consejoComunalId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `lidercomunidad` ADD COLUMN `consejoComunalId` INTEGER NOT NULL;
