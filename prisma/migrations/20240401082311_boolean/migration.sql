-- AlterTable
ALTER TABLE `user` ADD COLUMN `isUser` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `insId` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('HEAD', 'COORDINATOR', 'ASSISTANT') NOT NULL DEFAULT 'ASSISTANT',
    `isAdmin` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Admin_insId_key`(`insId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
