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

export const buttonRouter = createRouter().mutation("clicked", {
  input: z.object({ name: z.string() }),
  async resolve({ input }) {
    const { name } = input;
    console.log("🚀 ~ file: button.ts ~ line 21 ~ resolve ~ name", name);
    console.log(
      "🚀 ~ file: button.ts ~ line 22 ~ resolve ~ prisma.buttonClick",
      prisma.buttonClick
    );
    await prisma.buttonClick.create({ data: { name } });
    return "post";
  },
});
