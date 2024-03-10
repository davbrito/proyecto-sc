/*
  Warnings:

  - A unique constraint covering the columns `[consejoComunalId,manzana]` on the table `Lider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `manzana` to the `Lider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lider` ADD COLUMN `manzana` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `EntregaCajas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `costeCajaUnidad` DOUBLE NOT NULL,
    `costeTransporte` DOUBLE NOT NULL,
    `costeLogistica` DOUBLE NOT NULL,
    `fechaEntrega` DATETIME(3) NOT NULL,

    UNIQUE INDEX `EntregaCajas_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Lider_consejoComunalId_manzana_key` ON `Lider`(`consejoComunalId`, `manzana`);
