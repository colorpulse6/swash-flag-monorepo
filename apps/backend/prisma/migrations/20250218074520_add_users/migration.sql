/*
  Warnings:

  - You are about to drop the column `description` on the `FeatureFlag` table. All the data in the column will be lost.
  - Added the required column `userId` to the `FeatureFlag` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "FeatureFlag_name_key";

-- AlterTable
ALTER TABLE "FeatureFlag" DROP COLUMN "description",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_apiKey_key" ON "User"("apiKey");

-- AddForeignKey
ALTER TABLE "FeatureFlag" ADD CONSTRAINT "FeatureFlag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
