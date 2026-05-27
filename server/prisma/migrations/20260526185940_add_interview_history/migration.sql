-- CreateTable
CREATE TABLE "interviewHistory" (
    "id" SERIAL NOT NULL,
    "skill" TEXT NOT NULL,
    "questions" JSONB NOT NULL,
    "answers" JSONB NOT NULL,
    "results" JSONB NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "strengths" TEXT NOT NULL,
    "weaknesses" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interviewHistory_pkey" PRIMARY KEY ("id")
);
