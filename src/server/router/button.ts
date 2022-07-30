// src/server/router/post.ts

import { prisma } from "../db/client";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  title: true,
  body: true,
  createdAt: true,
});

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
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });
      return result[0];
    },
  });
