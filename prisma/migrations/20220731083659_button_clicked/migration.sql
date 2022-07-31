-- AddForeignKey
ALTER TABLE "ButtonClick" ADD CONSTRAINT "ButtonClick_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
