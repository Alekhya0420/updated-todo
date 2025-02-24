// // import { initTRPC, TRPCError } from "@trpc/server";



// // // Define the Context type
// // interface Context {
// //     session: {
// //       user: {
// //         id: string;
// //         role: string;
// //         permissions: Record<string, boolean>;
// //       } | null;
// //     };
// //   }


// // // Initialize TRPC
// // const t = initTRPC.context<Context>().create();

// // // export const isAuthenticated = t.middleware(({ ctx, next }) => {
// // //   if (!ctx.session?.user) {
// // //     throw new TRPCError({ code: "UNAUTHORIZED" });
// // //   }
// // //   return next({
// // //     ctx: {
// // //       user: ctx.session.user,
// // //     },
// // //   });
// // // });


// // export const isAuthenticated = t.middleware(({ ctx, next }) => {
// //     if (!ctx.session?.user) {
// //       throw new TRPCError({ code: "UNAUTHORIZED" });
// //     }
// //     return next({
// //       ctx: {
// //         user: ctx.session.user,
// //       },
// //     });
// //   });

// // // export const hasPermission = (requiredPermission: string) =>
// // //   t.middleware(({ ctx, next }) => {
// // //     if (ctx.user.role !== "ADMIN" && !ctx.user.permissions[requiredPermission]) {
// // //       throw new TRPCError({ code: "FORBIDDEN", message: "Access Denied" });
// // //     }
// // //     return next();
// // //   });

// // // Middleware to check if the user has the required permission
// // // export const hasPermission = (requiredPermission: string) =>
// // //     t.middleware(({ ctx, next }) => {
// // //       const user = ctx.session.user;
// // //       if (!user) {
// // //         throw new TRPCError({ code: "UNAUTHORIZED" });
// // //       }
// // //       if (user.role !== "ADMIN" && !user.permissions[requiredPermission]) {
// // //         throw new TRPCError({ code: "FORBIDDEN", message: "Access Denied" });
// // //       }
// // //       return next();
// // //     });


// // export const hasPermission = (requiredPermission: string) =>
// //     t.middleware(({ ctx, next }) => {
// //       const user = ctx.session.user;
// //       if (!user) {
// //         throw new TRPCError({ code: "UNAUTHORIZED" });
// //       }
// //       if (user.role !== "ADMIN" && !user.permissions[requiredPermission]) {
// //         throw new TRPCError({ code: "FORBIDDEN", message: "Access Denied" });
// //       }
// //       return next();
// //     });







// import { initTRPC, TRPCError } from '@trpc/server';
// import jwt from 'jsonwebtoken';
// import { prisma } from '@/lib/db';


// // Define the Context type
// interface Context {
//     session: {
//       user: {
//         id: string;
//         role: string;
//         permissions: Record<string, boolean>;
//       } | null;
//     };
//   }
// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is missing in environment variables.");
// }

// // Initialize TRPC
// const t = initTRPC.context<Context>().create();

// // Middleware to check if the user is authenticated
// export const isAuthenticated = t.middleware(async ({ ctx, next }) => {
//   const token = ctx.req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     throw new TRPCError({ code: "UNAUTHORIZED", message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
//     const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

//     if (!user) {
//       throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
//     }

//     return next({
//       ctx: { ...ctx, user },
//     });
//   } catch {
//     throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid or expired token" });
//   }
// });

// // Middleware to check if the user is an Admin
// export const isAdmin = t.middleware(async ({ ctx, next }) => {
//   if (ctx.user.role !== "ADMIN") {
//     throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
//   }
//   return next();
// });

// // Middleware to check if the user is a Subadmin and has the right permissions
// export const isSubadminWithPermission = (requiredPermission: string) =>
//   t.middleware(async ({ ctx, next }) => {
//     if (ctx.user.role !== "SUBADMIN") {
//       throw new TRPCError({ code: "FORBIDDEN", message: "Subadmin access required" });
//     }

//     const subadminPermissions = ctx.user.permissions || [];
//     if (!subadminPermissions.includes(requiredPermission)) {
//       throw new TRPCError({ code: "FORBIDDEN", message: "Permission denied" });
//     }

//     return next();
//   });
