/*
  Warnings:

  - You are about to drop the column `authorId` on the `Comment` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(5))`.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `badges` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to drop the `_UserBookmarks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserFollows` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `_UserBookmarks` DROP FOREIGN KEY `_UserBookmarks_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserBookmarks` DROP FOREIGN KEY `_UserBookmarks_B_fkey`;

-- DropForeignKey
ALTER TABLE `_UserFollows` DROP FOREIGN KEY `_UserFollows_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserFollows` DROP FOREIGN KEY `_UserFollows_B_fkey`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `authorId`,
    ADD COLUMN `parentId` VARCHAR(191) NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `type` ENUM('TEXT', 'IMAGE', 'VIDEO', 'LINK') NOT NULL DEFAULT 'TEXT',
    MODIFY `mediaUrl` TEXT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `bio`,
    DROP COLUMN `isVerified`,
    DROP COLUMN `name`,
    ADD COLUMN `businessTier` ENUM('START_UP', 'GROWTH', 'BRANDER', 'PROFESSIONAL', 'ENTERPRISE') NULL,
    ADD COLUMN `communityOrganizationRole` ENUM('INFLUENCER', 'ADVISOR', 'INVESTOR', 'AMBASSADOR', 'PRESIDENT') NULL,
    ADD COLUMN `communityOrganizerLevel` ENUM('START_UP', 'AMBASSADOR', 'INVESTORS', 'FIRM') NULL,
    ADD COLUMN `communitySupporterLevel` ENUM('COMMUNITY_SUPPORTERS', 'COMMUNITY_ADVOCATORS', 'COMMUNITY_COLLABORATORS', 'COMMUNITY_CURATORS', 'COMMUNITY_CONSTRUCTORS', 'COMMUNITY_INFLUENCERS', 'COMMUNITY_ADVISORS', 'COMMUNITY_INVESTORS', 'COMMUNITY_AMBASSADORS', 'COMMUNITY_PRESIDENT') NULL,
    ADD COLUMN `emailAddresses` JSON NULL,
    ADD COLUMN `externalAccounts` JSON NULL,
    ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL,
    ADD COLUMN `phoneNumbers` JSON NULL,
    ADD COLUMN `reputationScore` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `role` VARCHAR(191) NULL,
    ADD COLUMN `userType` ENUM('ADMIN', 'BUSINESS_OWNER', 'COMMUNITY_SUPPORTER', 'COMMUNITY_ORGANIZER', 'REGULAR_USER') NULL DEFAULT 'REGULAR_USER',
    ADD COLUMN `web3WalletAddress` VARCHAR(191) NULL,
    ADD COLUMN `web3Wallets` JSON NULL,
    MODIFY `username` VARCHAR(191) NULL,
    MODIFY `badges` JSON NULL;

-- DropTable
DROP TABLE `_UserBookmarks`;

-- DropTable
DROP TABLE `_UserFollows`;

-- CreateTable
CREATE TABLE `CommentReaction` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `commentId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `CommentReaction_commentId_idx`(`commentId`),
    INDEX `CommentReaction_userId_idx`(`userId`),
    UNIQUE INDEX `CommentReaction_userId_commentId_type_key`(`userId`, `commentId`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Marketplace` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `marketplaceId` VARCHAR(191) NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,

    INDEX `Item_marketplaceId_idx`(`marketplaceId`),
    INDEX `Item_ownerId_idx`(`ownerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Comment_userId_idx` ON `Comment`(`userId`);

-- CreateIndex
CREATE INDEX `Comment_parentId_idx` ON `Comment`(`parentId`);

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);

-- CreateIndex
CREATE INDEX `User_username_idx` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Comment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CommentReaction` ADD CONSTRAINT `CommentReaction_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentReaction` ADD CONSTRAINT `CommentReaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_marketplaceId_fkey` FOREIGN KEY (`marketplaceId`) REFERENCES `Marketplace`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
