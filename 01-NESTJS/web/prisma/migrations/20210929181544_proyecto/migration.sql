/*
  Warnings:

  - You are about to drop the column `fechaSalida` on the `Ropa` table. All the data in the column will be lost.
  - You are about to alter the column `sexo` on the `Ropa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Ropa` DROP COLUMN `fechaSalida`,
    ADD COLUMN `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `sexo` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `stock` INTEGER NOT NULL;
