import { prisma } from "../db/client";
import { z } from "zod";
import { createRouter } from "./context";

export const buttonRouter = createRouter()
  .mutation("clicked", {
    input: z.object({ name: z.string() }),
    async resolve({ input }) {
      const { name } = input;
      await prisma.buttonClick.create({ data: { name } });
      return "post";
    },
  })
  .query("lastClicked", {
    async resolve() {
      const result = await prisma.buttonClick.findMany({
        select: {
          name: true,
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
