-- AlterTable
ALTER TABLE "Beneficiados" ADD COLUMN     "poseeCarnet" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tipoFamilia" TEXT NOT NULL DEFAULT 'unifamiliar';
