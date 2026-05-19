import { Prisma, PrismaClient } from '@prisma/client';
export interface IPrismaService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    'query' | 'info' | 'warn' | 'error'
  > {}
