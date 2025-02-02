import { PrismaClient, User } from '@prisma/client';
import { prisma } from './prisma';
import {Request} from 'express'
import {getUser} from './services/auth/middleware/auth'

export interface Context {
  prisma: PrismaClient;
  user: any| null;
}
export const context = async ({ req }: { req: Request}): Promise<Context> => {
  const user = await getUser(req)
  return {
    prisma,
    user
  }
};

export interface ResolverContext extends Context {
  user: User | null;
}

export { prisma };
