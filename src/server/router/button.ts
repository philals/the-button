import { prisma } from "../db/client";
import { createRouter } from "./context";
import { createProtectedRouter } from "./protected-router";

export const openButtonRouter = createRouter().query("lastClicked", {
  async resolve() {
    const result = await prisma.buttonClick.findMany({
      select: {
        id: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });
    return result[0];
  },
});

export const protectedButtonRouter = createProtectedRouter().mutation(
  "clicked",
  {
    async resolve({ ctx }) {
      await prisma.buttonClick.create({
        data: { userId: ctx.session?.user?.id! },
      });
      return "post";
    },
  }
);
