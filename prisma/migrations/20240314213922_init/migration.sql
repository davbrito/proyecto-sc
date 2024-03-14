-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'LIDER_COMUNIDAD', 'LIDER_CALLE');

-- CreateEnum
CREATE TYPE "CONDICION_VIVIENDA" AS ENUM ('PROPIA', 'ALQUILADA', 'ARRIMADO', 'OTRO');

-- CreateEnum
CREATE TYPE "ESTADO_CIVIL" AS ENUM ('Soltero', 'Casado', 'Divorciado', 'Viudo');

-- CreateEnum
CREATE TYPE "ESTADO_TRABAJO" AS ENUM ('PUBLICA', 'PRIVADO', 'NO_TRABAJA');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "image" TEXT DEFAULT '',
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_user" "ROLE" NOT NULL DEFAULT 'LIDER_CALLE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consejoComunalId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ConsejoComunal" (
    "id" SERIAL NOT NULL,
    "nombre_consejo" TEXT NOT NULL,
    "nombre_clap" TEXT NOT NULL,
    "circuito" INTEGER NOT NULL,
    "bms" TEXT NOT NULL,
    "comunidad" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "cod_siscod" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "parroquia" TEXT NOT NULL,
    "rif" TEXT NOT NULL,
    "logo_clap" TEXT,
    "cantidad_combos" INTEGER NOT NULL DEFAULT 0,
    "cantidad_familias" INTEGER NOT NULL DEFAULT 0,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Censo" (
    "id" TEXT NOT NULL,
    "cargaFamiliar" INTEGER NOT NULL DEFAULT 1,
    "tipoFamilia" TEXT NOT NULL DEFAULT 'unifamiliar',
    "cajasClapsPorRecibir" INTEGER NOT NULL DEFAULT 0,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "condicion_vivienda" "CONDICION_VIVIENDA" NOT NULL,
    "datos_validado" BOOLEAN NOT NULL DEFAULT false,
    "encargado_validacion_id" TEXT,
    "estatus" INTEGER NOT NULL,
    "consejoComunalId" INTEGER NOT NULL,

    CONSTRAINT "Censo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Casa" (
    "id" BIGSERIAL NOT NULL,
    "manzana" TEXT NOT NULL,
    "casa" TEXT NOT NULL,
    "calle" TEXT NOT NULL,

    CONSTRAINT "Casa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JefeFamilia" (
    "id" BIGSERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "genero" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "estado_civil" "ESTADO_CIVIL" NOT NULL,
    "telefono_habitacion" TEXT NOT NULL,
    "estudiando" TEXT NOT NULL,
    "profesion" TEXT NOT NULL,
    "ocupacion" TEXT NOT NULL,
    "deporte" TEXT NOT NULL,
    "nivel_educativo" TEXT NOT NULL,
    "trabaja" "ESTADO_TRABAJO" NOT NULL DEFAULT 'NO_TRABAJA',
    "carnet_conapdis" BOOLEAN NOT NULL DEFAULT false,
    "enfermedad_cronica" TEXT NOT NULL,
    "recibe_pension" BOOLEAN NOT NULL DEFAULT false,
    "vacuna_covid" BOOLEAN NOT NULL DEFAULT false,
    "tipoDocumento" TEXT NOT NULL,
    "numeroDocumento" TEXT NOT NULL,
    "serialCarnetPatria" TEXT NOT NULL,
    "codCarnetPatria" TEXT NOT NULL,
    "observacion" TEXT NOT NULL,
    "discapacidad" TEXT NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "censoId" TEXT NOT NULL,
    "casaId" BIGINT,

    CONSTRAINT "JefeFamilia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Familiar" (
    "id" BIGSERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "numeroDocumento" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "genero" TEXT NOT NULL,
    "serialCarnetPatria" TEXT NOT NULL,
    "codCarnetPatria" TEXT NOT NULL,
    "observacion" TEXT NOT NULL,
    "parentesco" TEXT NOT NULL,
    "discapacidad" TEXT NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado_civil" "ESTADO_CIVIL" NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profesion" TEXT NOT NULL,
    "ocupacion" TEXT NOT NULL,
    "trabaja" "ESTADO_TRABAJO" NOT NULL DEFAULT 'NO_TRABAJA',
    "nivel_educativo" TEXT NOT NULL,
    "estudiando" TEXT NOT NULL,
    "deporte" TEXT NOT NULL,
    "enfermedad_cronica" TEXT NOT NULL,
    "recibe_pension" BOOLEAN NOT NULL DEFAULT false,
    "vacuna_covid" BOOLEAN NOT NULL DEFAULT false,
    "jefeFamiliaId" BIGINT NOT NULL,

    CONSTRAINT "Familiar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lider" (
    "id" SERIAL NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jefeFamiliaId" BIGINT NOT NULL,
    "consejoComunalId" INTEGER NOT NULL,
    "manzana" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LiderComunidad" (
    "id" SERIAL NOT NULL,
    "jefeFamiliaId" BIGINT NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consejoComunalId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "EncargadoClap" (
    "id" SERIAL NOT NULL,
    "cargo" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "profesion" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consejoComunalId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "EntregaCajas" (
    "id" SERIAL NOT NULL,
    "costeCajaUnidad" DOUBLE PRECISION NOT NULL,
    "costeTransporte" DOUBLE PRECISION NOT NULL,
    "costeLogistica" DOUBLE PRECISION NOT NULL,
    "fechaEntrega" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "ConsejoComunal_id_key" ON "ConsejoComunal"("id");

-- CreateIndex
CREATE UNIQUE INDEX "JefeFamilia_censoId_key" ON "JefeFamilia"("censoId");

-- CreateIndex
CREATE UNIQUE INDEX "Lider_id_key" ON "Lider"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lider_jefeFamiliaId_key" ON "Lider"("jefeFamiliaId");

-- CreateIndex
CREATE UNIQUE INDEX "Lider_consejoComunalId_manzana_key" ON "Lider"("consejoComunalId", "manzana");

-- CreateIndex
CREATE UNIQUE INDEX "LiderComunidad_id_key" ON "LiderComunidad"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LiderComunidad_jefeFamiliaId_key" ON "LiderComunidad"("jefeFamiliaId");

-- CreateIndex
CREATE UNIQUE INDEX "EncargadoClap_id_key" ON "EncargadoClap"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EntregaCajas_id_key" ON "EntregaCajas"("id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_consejoComunalId_fkey" FOREIGN KEY ("consejoComunalId") REFERENCES "ConsejoComunal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Censo" ADD CONSTRAINT "Censo_encargado_validacion_id_fkey" FOREIGN KEY ("encargado_validacion_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Censo" ADD CONSTRAINT "Censo_consejoComunalId_fkey" FOREIGN KEY ("consejoComunalId") REFERENCES "ConsejoComunal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JefeFamilia" ADD CONSTRAINT "JefeFamilia_censoId_fkey" FOREIGN KEY ("censoId") REFERENCES "Censo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JefeFamilia" ADD CONSTRAINT "JefeFamilia_casaId_fkey" FOREIGN KEY ("casaId") REFERENCES "Casa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Familiar" ADD CONSTRAINT "Familiar_jefeFamiliaId_fkey" FOREIGN KEY ("jefeFamiliaId") REFERENCES "JefeFamilia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lider" ADD CONSTRAINT "Lider_jefeFamiliaId_fkey" FOREIGN KEY ("jefeFamiliaId") REFERENCES "JefeFamilia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lider" ADD CONSTRAINT "Lider_consejoComunalId_fkey" FOREIGN KEY ("consejoComunalId") REFERENCES "ConsejoComunal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiderComunidad" ADD CONSTRAINT "LiderComunidad_jefeFamiliaId_fkey" FOREIGN KEY ("jefeFamiliaId") REFERENCES "JefeFamilia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiderComunidad" ADD CONSTRAINT "LiderComunidad_consejoComunalId_fkey" FOREIGN KEY ("consejoComunalId") REFERENCES "ConsejoComunal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EncargadoClap" ADD CONSTRAINT "EncargadoClap_consejoComunalId_fkey" FOREIGN KEY ("consejoComunalId") REFERENCES "ConsejoComunal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
