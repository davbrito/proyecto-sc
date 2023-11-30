/*
  Warnings:

  - You are about to alter the column `trabaja` on the `Familiar` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(5))`.

*/
-- AlterTable
ALTER TABLE `Censo` ADD COLUMN `datos_validado` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `encargado_validacion_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Familiar` MODIFY `trabaja` ENUM('PUBLICA', 'PRIVADO', 'NO_TRABAJA') NOT NULL DEFAULT 'NO_TRABAJA';
