/*
  Warnings:

  - You are about to drop the column `apellidos` on the `lider` table. All the data in the column will be lost.
  - You are about to drop the column `cantidad_combos` on the `lider` table. All the data in the column will be lost.
  - You are about to drop the column `cantidad_familias` on the `lider` table. All the data in the column will be lost.
  - You are about to drop the column `casaId` on the `lider` table. All the data in the column will be lost.
  - You are about to drop the column `cedula` on the `lider` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `lider` table. All the data in the column will be lost.
  - You are about to drop the column `genero` on the `lider` table. All the data in the column will be lost.
  - You are about to drop the column `latitud` on the `lider` table. All the data in the column will be lost.
  - You are about to drop the column `longitud` on the `lider` table. All the data in the column will be lost.
  - You are about to drop the column `nacionalidad` on the `lider` table. All the data in the column will be lost.
  - You are about to drop the column `nombres` on the `lider` table. All the data in the column will be lost.
  - You are about to drop the column `profesion` on the `lider` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `lider` table. All the data in the column will be lost.
  - You are about to drop the column `apellidos` on the `lidercomunidad` table. All the data in the column will be lost.
  - You are about to drop the column `cedula` on the `lidercomunidad` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `lidercomunidad` table. All the data in the column will be lost.
  - You are about to drop the column `genero` on the `lidercomunidad` table. All the data in the column will be lost.
  - You are about to drop the column `latitud` on the `lidercomunidad` table. All the data in the column will be lost.
  - You are about to drop the column `longitud` on the `lidercomunidad` table. All the data in the column will be lost.
  - You are about to drop the column `nacionalidad` on the `lidercomunidad` table. All the data in the column will be lost.
  - You are about to drop the column `nombres` on the `lidercomunidad` table. All the data in the column will be lost.
  - You are about to drop the column `profesion` on the `lidercomunidad` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `lidercomunidad` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jefeFamiliaId]` on the table `Lider` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jefeFamiliaId]` on the table `LiderComunidad` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jefeFamiliaId` to the `Lider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jefeFamiliaId` to the `LiderComunidad` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Lider_casaId_key` ON `lider`;

-- AlterTable
ALTER TABLE `lider` DROP COLUMN `apellidos`,
    DROP COLUMN `cantidad_combos`,
    DROP COLUMN `cantidad_familias`,
    DROP COLUMN `casaId`,
    DROP COLUMN `cedula`,
    DROP COLUMN `email`,
    DROP COLUMN `genero`,
    DROP COLUMN `latitud`,
    DROP COLUMN `longitud`,
    DROP COLUMN `nacionalidad`,
    DROP COLUMN `nombres`,
    DROP COLUMN `profesion`,
    DROP COLUMN `telefono`,
    ADD COLUMN `jefeFamiliaId` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `lidercomunidad` DROP COLUMN `apellidos`,
    DROP COLUMN `cedula`,
    DROP COLUMN `email`,
    DROP COLUMN `genero`,
    DROP COLUMN `latitud`,
    DROP COLUMN `longitud`,
    DROP COLUMN `nacionalidad`,
    DROP COLUMN `nombres`,
    DROP COLUMN `profesion`,
    DROP COLUMN `telefono`,
    ADD COLUMN `jefeFamiliaId` BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Lider_jefeFamiliaId_key` ON `Lider`(`jefeFamiliaId`);

-- CreateIndex
CREATE UNIQUE INDEX `LiderComunidad_jefeFamiliaId_key` ON `LiderComunidad`(`jefeFamiliaId`);
