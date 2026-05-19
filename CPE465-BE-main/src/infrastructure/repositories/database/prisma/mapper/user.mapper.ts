import { User } from '@domain/model';
import { User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  public static toPrisma(user: Partial<User>): PrismaUser {
    return {
      id: user.id,
      created_at: user.created_at,
      email: user.email,
      role:user.role,
      password: user.password
    };
  }

  public static toDomain(user: PrismaUser): User {
    if (!user) return null;
    return new User(user);
  }
}
