import { UserRepository } from '@domain/repositories/database/user.repository';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma.repository';
import { User } from '@domain/model';
import { PrismaTransaction } from '../prisma.transaction';
import { PrismaUserMapper } from '../mapper/user.mapper';

@Injectable()
export class PrismaUserRepository
  extends PrismaRepository
  implements UserRepository
{
  async getByEmail(email: string): Promise<User | null> {
    return this.getConnection(null)
      .user.findUnique({
        where: {
          email: email,
        },
      })
      .then((user) => {
        return PrismaUserMapper.toDomain(user);
      });
  }
  getAll(tx?: PrismaTransaction): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  getById(id: string | number, tx?: PrismaTransaction): Promise<User> {
    throw new Error('Method not implemented.');
  }
  create(entity: User, tx?: PrismaTransaction): Promise<User> {
    return this.getConnection(null)
      .user.create({
        data: entity,
      })
      .then((user) => {
        return PrismaUserMapper.toDomain(user);
      });
  }
  createMany(
    entities: User[],
    tx?: PrismaTransaction,
  ): Promise<{ count: number }> {
    throw new Error('Method not implemented.');
  }
  update(entity: User, tx?: PrismaTransaction): Promise<User> {
    throw new Error('Method not implemented.');
  }
  remove(id: string | number, tx?: PrismaTransaction): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
