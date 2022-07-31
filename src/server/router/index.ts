// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { openButtonRouter, protectedButtonRouter } from "./button";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("question.", protectedExampleRouter)
  .merge("button.", protectedButtonRouter)
  .merge("button.", openButtonRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
