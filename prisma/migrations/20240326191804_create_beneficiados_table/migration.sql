/*
  Warnings:

  - You are about to drop the column `censadosId` on the `EntregaCajas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EntregaCajas" DROP CONSTRAINT "EntregaCajas_censadosId_fkey";

-- AlterTable
ALTER TABLE "EntregaCajas" DROP COLUMN "censadosId";

-- CreateTable
CREATE TABLE "Beneficiados" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "numeroDocumento" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "cajasAsignadas" INTEGER NOT NULL,
    "casa" TEXT NOT NULL,
    "manzana" TEXT NOT NULL,
    "entregaCajasId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Beneficiados_id_key" ON "Beneficiados"("id");

-- AddForeignKey
ALTER TABLE "Beneficiados" ADD CONSTRAINT "Beneficiados_entregaCajasId_fkey" FOREIGN KEY ("entregaCajasId") REFERENCES "EntregaCajas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
