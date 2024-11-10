-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "forwarding" TEXT,
ADD COLUMN     "nis" TEXT,
ADD COLUMN     "priorityGroup" TEXT,
ADD COLUMN     "recordNumber" TEXT,
ALTER COLUMN "cpf" DROP NOT NULL,
ALTER COLUMN "rg" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL;
