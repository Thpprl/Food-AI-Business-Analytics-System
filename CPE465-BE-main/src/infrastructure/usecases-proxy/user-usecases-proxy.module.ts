import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from './usecases-proxy';
import { DatabaseModule } from '@infrastructure/repositories/database/database.module';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';
import { CreateUserUseCase } from '@usecases/index';
import { UserRepository } from '@domain/repositories/database';
import { PrismaUserRepository } from '@infrastructure/repositories/database/prisma/repositories';

@Module({
  imports: [DatabaseModule, EnvironmentConfigModule],
})
export class UserUsecasesProxyModule {
  static CREATE_USER_USECASE = 'CreateUserUsecase';

  static register(): DynamicModule {
    return {
      module: UserUsecasesProxyModule,
      providers: [
        {
          inject: [PrismaUserRepository],
          provide: UserUsecasesProxyModule.CREATE_USER_USECASE,
          useFactory: (userRepository: PrismaUserRepository) =>
            new UseCaseProxy(new CreateUserUseCase(userRepository)),
        },
      ],
      exports: [UserUsecasesProxyModule.CREATE_USER_USECASE],
    };
  }
}
