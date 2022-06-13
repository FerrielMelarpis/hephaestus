/*
  Warnings:

  - A unique constraint covering the columns `[provider,subject]` on the table `FederatedCredential` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FederatedCredential_provider_subject_key" ON "FederatedCredential"("provider", "subject");
