import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';
import { procedure, router } from '../trpc';
import { prisma } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export const authRouter = router({
  // Register a new user
  register: procedure.input(
    z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email(),
      password: z.string().min(6, "Password must be at least 6 characters"),
    })
  ).mutation(async ({ input }) => {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new TRPCError({ code: "CONFLICT", message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
        role: 'USER',
      },
    });

    return { message: "User registered successfully", userId: user.id };
  }),

  // User login
  login: procedure.input(
    z.object({
      email: z.string().email(),
      password: z.string(),
    })
  ).mutation(async ({ input }) => {
    const user = await prisma.user.findUnique({ where: { email: input.email } });

    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      token,
      role: user.role,
      userId: user.id,
      name: user.name,
      email: user.email,
      permissions: user.permissions,
    };
  }),

  // Get session details from token
  getSession: procedure.input(
    z.object({ token: z.string() })
  ).query(async ({ input }) => {
    try {
      const decoded = jwt.verify(input.token, JWT_SECRET) as { userId: string };
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, name: true, email: true, role: true },
      });

      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
      }

      return user;
    } catch (error) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid or expired token" });
    }
  }),
});
