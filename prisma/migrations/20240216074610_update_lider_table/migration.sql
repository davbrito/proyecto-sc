/*
  Warnings:

  - You are about to drop the `lidercalle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `lidercalle`;

-- CreateTable
CREATE TABLE `Lider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `cedula` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `profesion` VARCHAR(191) NOT NULL,
    `nacionalidad` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `cantidad_familias` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `cantidad_combos` INTEGER NOT NULL,
    `longitud` DOUBLE NOT NULL,
    `latitud` DOUBLE NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `casaId` BIGINT NOT NULL,
    `tipoLider` ENUM('LIDER_COMUNIDAD', 'LIDER_CALLE') NOT NULL,

    UNIQUE INDEX `Lider_id_key`(`id`),
    UNIQUE INDEX `Lider_casaId_key`(`casaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
