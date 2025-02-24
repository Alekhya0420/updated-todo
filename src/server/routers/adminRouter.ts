import { prisma } from "@/lib/db";
import { procedure, router } from "../trpc";
import { z } from "zod";

export const adminRouter = router({
  // Fetch all users with task count
  getAllUsers: procedure.query(async () => {
    return await prisma.user.findMany({
      where: { role: {in: ["USER", "SUBADMIN"]} },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        permissions: true,
        tasks: true,
      }
    });
  }),

  // Fetch tasks of a specific user
  getUserTasks: procedure.input(z.string()).query(async ({ input }) => {
    return await prisma.task.findMany({
      where: { userId: input }
    });
  }),

  // Admin can edit tasks
  editTask: procedure
    .input(
      z.object({
        taskId: z.string(),
        title: z.string(),
        description: z.string(),
        deadline: z.string().optional() 
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.task.update({
        where: { id: input.taskId },
        data: {
          title: input.title,
          description: input.description,
          deadline: input.deadline ? new Date(input.deadline) : undefined 
        }
      });
    }),

  // Admin can delete any task
  deleteTask: procedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.task.delete({ where: { id: input } });
  }),


  //update user role
  updateUserRole: procedure
  .input(
    z.object({
      userId: z.string(),
      permissions: z.object({
        viewAllTasks: z.boolean(),
        editAllTasks: z.boolean(),
        deleteAllTasks: z.boolean(),
      }),
    })
  )
  .mutation(async ({ input }) => {
    const isAllPermissionsFalse =
      !input.permissions.viewAllTasks &&
      !input.permissions.editAllTasks &&
      !input.permissions.deleteAllTasks;

    return await prisma.user.update({
      where: { id: input.userId },
      data: {
        role: isAllPermissionsFalse ? "USER" : "SUBADMIN",
        permissions: input.permissions,
      },
    });
  }),
});
