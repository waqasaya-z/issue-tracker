-- AlterTable
ALTER TABLE `course` ADD COLUMN `status` ENUM('ACCEPT', 'REJECT', 'UNASSIGNED') NOT NULL DEFAULT 'UNASSIGNED';