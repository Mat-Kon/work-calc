-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('QUEUED', 'IN_PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'QUEUED';

-- CreateIndex
CREATE INDEX "Order_userId_status_idx" ON "Order"("userId", "status");
