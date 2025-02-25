import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, procedure } from "../trpc"; 

export const subadminRouter = router({
  
  getAllTasks: procedure.query(async ({ ctx }) => {
    if (!ctx.ability.can("view", "Task")) {
      throw new TRPCError({ code: "FORBIDDEN", message: "No permission to view tasks" });
    }
    return ctx.prisma.task.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });
  }),


//Edit task
  updateTask: procedure
  .input(z.object({ id: z.string(), title: z.string(), description: z.string(), deadline: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.prisma.task.update({
      where: { id: input.id },
      data: { title: input.title, description: input.description, deadline: input.deadline ? new Date(input.deadline) : undefined },
    });
  }),

// Delete task
  deleteTask: procedure
    .input(z.object({ taskId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.task.delete({ where: { id: input.taskId } });
    }),
});

