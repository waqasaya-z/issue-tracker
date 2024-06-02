/*
  Warnings:

  - You are about to alter the column `prerequisite` on the `course` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `course` MODIFY `prerequisite` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO';
