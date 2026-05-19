import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUserRepository } from './repositories';
import { UserRepository } from '@domain/repositories/database';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';

const primsaRepositories = [PrismaUserRepository];
@Module({
  imports: [EnvironmentConfigModule],
  providers: [PrismaService, ...primsaRepositories, EnvironmentConfigModule],
  exports: [PrismaService, ...primsaRepositories],
})
export class PrismaModule {}
