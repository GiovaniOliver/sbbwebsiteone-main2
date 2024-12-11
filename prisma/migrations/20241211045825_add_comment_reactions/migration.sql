/*
  Warnings:

  - You are about to drop the column `authorId` on the `Comment` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the column `coverPhoto` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `joinedDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `DAOMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventAttendee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Proposal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_postId_fkey`;

-- DropForeignKey
ALTER TABLE `DAOMember` DROP FOREIGN KEY `DAOMember_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_organizerId_fkey`;

-- DropForeignKey
ALTER TABLE `EventAttendee` DROP FOREIGN KEY `EventAttendee_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `EventAttendee` DROP FOREIGN KEY `EventAttendee_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_buyerId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_sellerId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_sellerId_fkey`;

-- DropForeignKey
ALTER TABLE `Proposal` DROP FOREIGN KEY `Proposal_creatorId_fkey`;

-- DropForeignKey
ALTER TABLE `Vote` DROP FOREIGN KEY `Vote_proposalId_fkey`;

-- DropForeignKey
ALTER TABLE `Vote` DROP FOREIGN KEY `Vote_voterId_fkey`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `authorId`,
    ADD COLUMN `parentId` VARCHAR(191) NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `type` ENUM('text', 'image', 'video') NOT NULL DEFAULT 'text';

-- AlterTable
ALTER TABLE `User` DROP COLUMN `coverPhoto`,
    DROP COLUMN `joinedDate`,
    DROP COLUMN `location`,
    DROP COLUMN `role`,
    DROP COLUMN `website`,
    MODIFY `badges` VARCHAR(191) NOT NULL DEFAULT '[]';

-- DropTable
DROP TABLE `DAOMember`;

-- DropTable
DROP TABLE `Event`;

-- DropTable
DROP TABLE `EventAttendee`;

-- DropTable
DROP TABLE `Order`;

-- DropTable
DROP TABLE `Product`;

-- DropTable
DROP TABLE `Proposal`;

-- DropTable
DROP TABLE `Vote`;

-- CreateTable
CREATE TABLE `CommentReaction` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `commentId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `CommentReaction_commentId_idx`(`commentId`),
    INDEX `CommentReaction_userId_idx`(`userId`),
    UNIQUE INDEX `CommentReaction_commentId_userId_type_key`(`commentId`, `userId`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Comment_userId_idx` ON `Comment`(`userId`);

-- CreateIndex
CREATE INDEX `Comment_parentId_idx` ON `Comment`(`parentId`);

-- CreateIndex
CREATE INDEX `Follow_followerId_idx` ON `Follow`(`followerId`);

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Comment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CommentReaction` ADD CONSTRAINT `CommentReaction_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Bookmark` RENAME INDEX `Bookmark_userId_fkey` TO `Bookmark_userId_idx`;

-- RenameIndex
ALTER TABLE `Comment` RENAME INDEX `Comment_postId_fkey` TO `Comment_postId_idx`;

-- RenameIndex
ALTER TABLE `Follow` RENAME INDEX `Follow_followingId_fkey` TO `Follow_followingId_idx`;

-- RenameIndex
ALTER TABLE `Like` RENAME INDEX `Like_userId_fkey` TO `Like_userId_idx`;

-- RenameIndex
ALTER TABLE `Post` RENAME INDEX `Post_authorId_fkey` TO `Post_authorId_idx`;
