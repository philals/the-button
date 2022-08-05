import { prisma } from "../db/client";
import { createRouter } from "./context";
import { createProtectedRouter } from "./protected-router";

export const openButtonRouter = createRouter().query("lastClicked", {
  async resolve() {
    return await getLatestClick();
  },
});

export interface Click {
  createdAt: string;
  imageUrl: string;
}

export async function getLatestClick(): Promise<Click> {
  const result = await prisma.buttonClick.findMany({
    select: {
      id: true,
      user: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });
  return {
    createdAt: JSON.parse(JSON.stringify(result[0]!.createdAt)),
    imageUrl: result[0]!.user.image!,
  };
}

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
