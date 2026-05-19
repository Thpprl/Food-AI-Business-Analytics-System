import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from './usecases-proxy';
import { DatabaseModule } from '@infrastructure/repositories/database/database.module';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';
import { CreateUserUseCase } from '@usecases/index';
import { UserRepository } from '@domain/repositories/database';
import { AnalysisIdeaUseCase } from '@usecases/business_analysis/analysis-idea.use-case';
import { BusinessAnalysisModule } from '@infrastructure/repositories/api/business-analysis/business-analysis.module';
import { BusinessAnalysisService } from '@infrastructure/repositories/api/business-analysis/business-analysis.service';

@Module({
  imports: [DatabaseModule, EnvironmentConfigModule, BusinessAnalysisModule],
})
export class BusinessAnalysisUsecasesProxyModule {
  static ANALYSIS_IDEA_USECASE = 'AnalysisIdeaUseCase';

  static register(): DynamicModule {
    return {
      module: BusinessAnalysisUsecasesProxyModule,
      providers: [
        {
          inject: [BusinessAnalysisService],
          provide: BusinessAnalysisUsecasesProxyModule.ANALYSIS_IDEA_USECASE,
          useFactory: (businessAnalysisService: BusinessAnalysisService) =>
            new UseCaseProxy(new AnalysisIdeaUseCase(businessAnalysisService)),
        },
      ],
      exports: [BusinessAnalysisUsecasesProxyModule.ANALYSIS_IDEA_USECASE],
    };
  }
}
