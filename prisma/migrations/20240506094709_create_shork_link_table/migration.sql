-- CreateTable
CREATE TABLE `ShortLink` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `originalUrl` VARCHAR(191) NOT NULL,
    `shortUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ShortLink_shortUrl_key`(`shortUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShortLinkClick` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shortLinkId` INTEGER NOT NULL,
    `ipAddress` VARCHAR(191) NOT NULL,
    `userAgent` VARCHAR(191) NOT NULL,
    `referer` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShortLinkClick` ADD CONSTRAINT `ShortLinkClick_shortLinkId_fkey` FOREIGN KEY (`shortLinkId`) REFERENCES `ShortLink`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
