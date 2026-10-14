-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "discountPercent" DECIMAL(5,2) NOT NULL DEFAULT 0,
ADD COLUMN     "isPrepaid" BOOLEAN NOT NULL DEFAULT false;
