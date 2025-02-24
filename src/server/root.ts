import { z } from 'zod';
import { procedure, router } from './trpc';
import { authRouter } from './routers/auth';
import { taskRouter } from './routers/taskRouter';
import { adminRouter } from './routers/adminRouter';
import { subadminRouter } from './routers/subadminRouter';
export const appRouter = router({
//   hello: procedure
//     .input(
//       z.object({
//         text: z.string(),
//       }),
//     )
//     .query((opts) => {
//       return {
//         greeting: `hello ${opts.input.text}`,
//       };
//     }),
  auth: authRouter,
  task: taskRouter,
  admin: adminRouter,
  subadmin: subadminRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;