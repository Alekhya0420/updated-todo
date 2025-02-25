import { prisma } from '@/lib/db';
import { verifyToken } from '@/utils/auth';
import { defineAbilitiesFor } from '@/utils/casl';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import jwt, { JwtPayload } from "jsonwebtoken";
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<typeof createContextInner>().create();
// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;




//for casl
export async function createContextInner(opts?: { req?: any }) {
  const authHeader = opts?.req?.headers?.authorization;
  let user = null;

  if (authHeader?.startsWith("Bearer")){
    try {
      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);
      user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, role: true, permissions: true },
      });
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const role = user?.role || "USER";
  const permissions = user?.permissions || {};
  const ability = defineAbilitiesFor(role, permissions);

  return { prisma, user, ability };
}

export type Context = inferAsyncReturnType<typeof createContextInner>;
