/*
  Warnings:

  - Added the required column `censadosId` to the `EntregaCajas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consejoComunalId` to the `EntregaCajas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EntregaCajas" ADD COLUMN     "censadosId" TEXT NOT NULL,
ADD COLUMN     "consejoComunalId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "EntregaCajas" ADD CONSTRAINT "EntregaCajas_censadosId_fkey" FOREIGN KEY ("censadosId") REFERENCES "Censo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntregaCajas" ADD CONSTRAINT "EntregaCajas_consejoComunalId_fkey" FOREIGN KEY ("consejoComunalId") REFERENCES "ConsejoComunal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
