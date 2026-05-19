import { Prisma, PrismaClient } from '@prisma/client';
// import { DefaultArgs } from '@prisma/client/runtime/library';

export interface PrismaTransaction
  extends Omit<
    PrismaClient<Prisma.PrismaClientOptions, never>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  > {}
