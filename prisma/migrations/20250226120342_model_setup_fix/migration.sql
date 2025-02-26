/*
  Warnings:

  - Added the required column `adminId` to the `Hostel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Hostel" DROP CONSTRAINT "Hostel_managedBy_fkey";

-- AlterTable
ALTER TABLE "Hostel" ADD COLUMN     "adminId" TEXT NOT NULL,
ALTER COLUMN "managedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Outing" ALTER COLUMN "approverId" DROP NOT NULL,
ALTER COLUMN "checkOutTime" DROP NOT NULL,
ALTER COLUMN "securitySignature" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Hostel" ADD CONSTRAINT "Hostel_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
