/*
  Warnings:

  - You are about to drop the column `tipoLider` on the `lider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `lider` DROP COLUMN `tipoLider`;

-- CreateTable
CREATE TABLE `LiderComunidad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `cedula` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `profesion` VARCHAR(191) NOT NULL,
    `nacionalidad` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `longitud` DOUBLE NOT NULL,
    `latitud` DOUBLE NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `LiderComunidad_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
