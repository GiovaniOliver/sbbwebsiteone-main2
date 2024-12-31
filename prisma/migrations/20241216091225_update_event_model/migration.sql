/*
  Warnings:

  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `isVirtual` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Event` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `location` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Event_date_idx` ON `Event`;

-- AlterTable
ALTER TABLE `Event` DROP COLUMN `date`,
    DROP COLUMN `isVirtual`,
    DROP COLUMN `link`,
    DROP COLUMN `name`,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `maxAttendees` INTEGER NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    MODIFY `location` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `RSVP` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('GOING', 'MAYBE', 'NOT_GOING') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `RSVP_eventId_idx`(`eventId`),
    INDEX `RSVP_userId_idx`(`userId`),
    UNIQUE INDEX `RSVP_eventId_userId_key`(`eventId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `id` VARCHAR(191) NOT NULL,
    `checkedInAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `eventId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `Attendance_eventId_idx`(`eventId`),
    INDEX `Attendance_userId_idx`(`userId`),
    UNIQUE INDEX `Attendance_eventId_userId_key`(`eventId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('FOLLOW', 'LIKE', 'COMMENT', 'EVENT_REMINDER', 'EVENT_RSVP', 'EVENT_UPDATE', 'MENTION', 'POST_SHARE', 'GROUP_INVITE', 'GROUP_JOIN', 'MESSAGE_RECEIVED', 'ACHIEVEMENT_UNLOCKED', 'PROFILE_VISIT', 'MILESTONE_REACHED', 'SYSTEM_ANNOUNCEMENT') NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `priority` VARCHAR(191) NULL DEFAULT 'normal',
    `metadata` JSON NULL,
    `expiresAt` DATETIME(3) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `fromUserId` VARCHAR(191) NULL,
    `eventId` VARCHAR(191) NULL,

    INDEX `Notification_userId_idx`(`userId`),
    INDEX `Notification_fromUserId_idx`(`fromUserId`),
    INDEX `Notification_eventId_idx`(`eventId`),
    INDEX `Notification_type_idx`(`type`),
    INDEX `Notification_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Event_startDate_idx` ON `Event`(`startDate`);

-- CreateIndex
CREATE INDEX `Event_endDate_idx` ON `Event`(`endDate`);

-- AddForeignKey
ALTER TABLE `RSVP` ADD CONSTRAINT `RSVP_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RSVP` ADD CONSTRAINT `RSVP_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_fromUserId_fkey` FOREIGN KEY (`fromUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
