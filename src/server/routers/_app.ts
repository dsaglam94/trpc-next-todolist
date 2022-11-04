import { inferProcedureInput, inferProcedureOutput } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../utils/prisma";

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    const todos = await prisma.todoItem.findMany({});
    if (!todos) {
      throw new Error("something went wrong while fetching todos");
    }

    return todos;
  }),
  createTodo: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const createdTodo = await prisma?.todoItem.create({
        data: {
          ...input,
        },
      });
      return { success: true, todo: createdTodo };
    }),
  deleteTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input: { id } }) => {
      await prisma.todoItem.delete({
        where: {
          id,
        },
      });
      return { deleted: true };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type TodoInput = inferProcedureInput<AppRouter["createTodo"]>;
export type TodoOutput = inferProcedureOutput<AppRouter["createTodo"]>;
