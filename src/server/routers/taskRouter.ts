import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from "@/lib/db";

export const taskRouter = router({
  // for creating a new task
  createTask: procedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        userId: z.string(),
        deadline: z.string()
      })
    )
    // .mutation(async ({ input }) => {
    //   return await prisma.task.create({
    //     data: { title: input.title, completed: false, userId: input.userId },
    //   });
    // }),

    .mutation(async ({ input }) => {
      const userExists = await prisma.user.findUnique({
        where: { id: input.userId }
      });

      if (!userExists) {
        console.error("User not found with ID:", input.userId);
        throw new Error("User not found");
      }

      return await prisma.task.create({
        data: {
          title: input.title,
          description: input.description,
          completed: false,
          userId: input.userId,
          deadline: new Date(input.deadline)
        }
      });
    }),

  // for getting all tasks
  getTasks: procedure.input(z.string()).query(async ({ input }) => {
    return await prisma.task.findMany({
      where: { userId: input }
    });
  }),

  // for updating a task toggle completed
  toggleTask: procedure.input(z.string()).mutation(async ({ input }) => {
    const task = await prisma.task.findUnique({ where: { id: input } });
    if (!task) throw new Error("Task not found");
    return await prisma.task.update({
      where: { id: input },
      data: { completed: !task.completed }
    });
  }),

  // for  deleting a task
  deleteTask: procedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.task.delete({ where: { id: input } });
  })
});
