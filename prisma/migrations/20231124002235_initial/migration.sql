-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL DEFAULT '',
    `lastName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role_user` ENUM('ADMIN', 'LIDER_COMUNIDAD', 'LIDER_CALLE') NOT NULL DEFAULT 'LIDER_CALLE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `consejoComunalId` INTEGER NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConsejoComunal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_consejo` VARCHAR(191) NOT NULL,
    `nombre_clap` VARCHAR(191) NOT NULL,
    `circuito` INTEGER NOT NULL,
    `bms` VARCHAR(191) NOT NULL,
    `comunidad` VARCHAR(191) NOT NULL,
    `sector` VARCHAR(191) NOT NULL,
    `cod_siscod` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `municipio` VARCHAR(191) NOT NULL,
    `parroquia` VARCHAR(191) NOT NULL,
    `rif` VARCHAR(191) NOT NULL,
    `logo_clap` VARCHAR(191) NULL,
    `cantidad_combos` INTEGER NOT NULL DEFAULT 0,
    `cantidad_familias` INTEGER NOT NULL DEFAULT 0,
    `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ConsejoComunal_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Censo` (
    `id` VARCHAR(191) NOT NULL,
    `cargaFamiliar` INTEGER NOT NULL DEFAULT 1,
    `tipoFamilia` VARCHAR(191) NOT NULL DEFAULT 'unifamiliar',
    `cajasClapsPorRecibir` INTEGER NOT NULL DEFAULT 0,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `condicion_vivienda` ENUM('PROPIA', 'ALQUILADA', 'ARRIMADO', 'OTRO') NOT NULL,
    `consejoComunalId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Casa` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `manzana` VARCHAR(191) NOT NULL,
    `casa` VARCHAR(191) NOT NULL,
    `calle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JefeFamilia` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `estado_civil` ENUM('Soltero', 'Casado', 'Divorciado', 'Viudo') NOT NULL,
    `telefono_habitacion` VARCHAR(191) NOT NULL,
    `estudiando` VARCHAR(191) NOT NULL,
    `profesion` VARCHAR(191) NOT NULL,
    `ocupacion` VARCHAR(191) NOT NULL,
    `deporte` VARCHAR(191) NOT NULL,
    `nivel_educativo` VARCHAR(191) NOT NULL,
    `trabaja` ENUM('PUBLICA', 'PRIVADO', 'NO_TRABAJA') NOT NULL DEFAULT 'NO_TRABAJA',
    `carnet_conapdis` BOOLEAN NOT NULL DEFAULT false,
    `enfermedad_cronica` VARCHAR(191) NOT NULL,
    `recibe_pension` BOOLEAN NOT NULL DEFAULT false,
    `vacuna_covid` BOOLEAN NOT NULL DEFAULT false,
    `tipoDocumento` VARCHAR(191) NOT NULL,
    `numeroDocumento` VARCHAR(191) NOT NULL,
    `serialCarnetPatria` VARCHAR(191) NOT NULL,
    `codCarnetPatria` VARCHAR(191) NOT NULL,
    `observacion` VARCHAR(191) NOT NULL,
    `discapacidad` VARCHAR(191) NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `censoId` VARCHAR(191) NOT NULL,
    `casaId` BIGINT NULL,

    UNIQUE INDEX `JefeFamilia_censoId_key`(`censoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Familiar` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `numeroDocumento` VARCHAR(191) NOT NULL,
    `tipoDocumento` VARCHAR(191) NOT NULL,
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `serialCarnetPatria` VARCHAR(191) NOT NULL,
    `codCarnetPatria` VARCHAR(191) NOT NULL,
    `observacion` VARCHAR(191) NOT NULL,
    `parentesco` VARCHAR(191) NOT NULL,
    `discapacidad` VARCHAR(191) NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado_civil` ENUM('Soltero', 'Casado', 'Divorciado', 'Viudo') NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `profesion` VARCHAR(191) NOT NULL,
    `ocupacion` VARCHAR(191) NOT NULL,
    `trabaja` BOOLEAN NOT NULL,
    `nivel_educativo` VARCHAR(191) NOT NULL,
    `estudiando` VARCHAR(191) NOT NULL,
    `deporte` VARCHAR(191) NOT NULL,
    `enfermedad_cronica` VARCHAR(191) NOT NULL,
    `recibe_pension` BOOLEAN NOT NULL DEFAULT false,
    `vacuna_covid` BOOLEAN NOT NULL DEFAULT false,
    `jefeFamiliaId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LiderCalle` (
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

    UNIQUE INDEX `LiderCalle_id_key`(`id`),
    UNIQUE INDEX `LiderCalle_casaId_key`(`casaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EncargadoClap` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cargo` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `cedula` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `profesion` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `consejoComunalId` INTEGER NOT NULL,

    UNIQUE INDEX `EncargadoClap_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
