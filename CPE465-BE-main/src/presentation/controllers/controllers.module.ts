import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';
import { UserUsecasesProxyModule } from '@infrastructure/usecases-proxy/user-usecases-proxy.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller.module';
import { BusinessAnalysisUsecasesProxyModule } from '@infrastructure/usecases-proxy/business-analysis-usecases-proxy.module';
import { BusinessAnalysisController } from './business-analysis.controller.module';
import { AuthUsecasesProxyModule } from '@infrastructure/usecases-proxy/auth-usecases-proxy.module';
import { AuthController } from './auth.controller.module';
@Module({
  imports: [
    UserUsecasesProxyModule.register(),
    BusinessAnalysisUsecasesProxyModule.register(),
    AuthUsecasesProxyModule.register(),
  ],
  controllers: [UserController, BusinessAnalysisController, AuthController],
})
export class ControllersModule {}
