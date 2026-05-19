import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from './usecases-proxy';
import { DatabaseModule } from '@infrastructure/repositories/database/database.module';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';
import { SignInPasswordUseCase, SignUpPasswordUseCase } from '@usecases/index';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config.service';
import { PrismaUserRepository } from '@infrastructure/repositories/database/prisma/repositories';
import { RefreshTokenUseCase } from '@usecases/auth/refresh-token.use-case';

@Module({
  imports: [DatabaseModule, EnvironmentConfigModule],
})
export class AuthUsecasesProxyModule {
  static SIGN_UP_PASSWORD_USECASE = 'SignUpPasswordUseCase';
  static SIGN_IN_PASSWORD_USECASE = 'SignInPasswordUseCase';
  static REFRESH_TOKEN_USECASE = 'RefreshTokenUseCase';

  static register(): DynamicModule {
    return {
      module: AuthUsecasesProxyModule,
      providers: [
        {
          inject: [EnvironmentConfigService, PrismaUserRepository],
          provide: AuthUsecasesProxyModule.SIGN_UP_PASSWORD_USECASE,
          useFactory: (
            configService: EnvironmentConfigService,
            userRepository: PrismaUserRepository,
          ) =>
            new UseCaseProxy(
              new SignUpPasswordUseCase(configService, userRepository),
            ),
        },
        {
          inject: [EnvironmentConfigService, PrismaUserRepository],
          provide: AuthUsecasesProxyModule.SIGN_IN_PASSWORD_USECASE,
          useFactory: (
            configService: EnvironmentConfigService,
            userRepository: PrismaUserRepository,
          ) =>
            new UseCaseProxy(
              new SignInPasswordUseCase(configService, userRepository),
            ),
        },
        {
          inject: [EnvironmentConfigService],
          provide: AuthUsecasesProxyModule.REFRESH_TOKEN_USECASE,
          useFactory: (configService: EnvironmentConfigService) =>
            new UseCaseProxy(new RefreshTokenUseCase(configService)),
        },
      ],
      exports: [
        AuthUsecasesProxyModule.SIGN_UP_PASSWORD_USECASE,
        AuthUsecasesProxyModule.SIGN_IN_PASSWORD_USECASE,
        AuthUsecasesProxyModule.REFRESH_TOKEN_USECASE,
      ],
    };
  }
}
