import { PrismaTransaction } from '@infrastructure/repositories/database/prisma/prisma.transaction';

export abstract class IGenericRepository<T> {
  abstract getAll(tx?: PrismaTransaction): Promise<T[]>;
  abstract getById(id: string | number, tx?: PrismaTransaction): Promise<T>;
  abstract create(entity: T, tx?: PrismaTransaction): Promise<T>;
  abstract createMany(
    entities: T[],
    tx?: PrismaTransaction,
  ): Promise<{
    count: number;
  }>;
  abstract update(entity: T, tx?: PrismaTransaction): Promise<T>;
  abstract remove(id: string | number, tx?: PrismaTransaction): Promise<T>;
}
