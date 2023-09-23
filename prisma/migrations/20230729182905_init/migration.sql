-- CreateTable
CREATE TABLE "TimerSequence" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "TimerSequence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3),
    "duration" INTEGER NOT NULL,
    "sequence_id" UUID,

    CONSTRAINT "timer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimerPause" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3),
    "timer_id" UUID NOT NULL,

    CONSTRAINT "TimerPause_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "timer" ADD CONSTRAINT "timer_sequence_id_fkey" FOREIGN KEY ("sequence_id") REFERENCES "TimerSequence"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimerPause" ADD CONSTRAINT "TimerPause_timer_id_fkey" FOREIGN KEY ("timer_id") REFERENCES "timer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
