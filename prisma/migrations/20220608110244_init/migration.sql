-- CreateTable
CREATE TABLE "Bot" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "purpose" TEXT NOT NULL,

    CONSTRAINT "Bot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bot_name_key" ON "Bot"("name");
