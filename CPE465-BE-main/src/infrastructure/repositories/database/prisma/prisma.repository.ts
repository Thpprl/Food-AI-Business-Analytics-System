import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaTransaction } from './prisma.transaction';

@Injectable()
export class PrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public getConnection(tx: PrismaTransaction) {
    if (tx) return tx;
    return this.prismaService;
  }
}
