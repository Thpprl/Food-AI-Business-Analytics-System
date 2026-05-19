import { BusinessIdeaDto } from '@infrastructure/dtos/business_analysis/business-analysis.dto';
import { CreateUserDto } from '@infrastructure/dtos/user/create-user.dto';
import { BusinessAnalysisUsecasesProxyModule } from '@infrastructure/usecases-proxy/business-analysis-usecases-proxy.module';
import { UseCaseProxy } from '@infrastructure/usecases-proxy/usecases-proxy';
import { UserUsecasesProxyModule } from '@infrastructure/usecases-proxy/user-usecases-proxy.module';
import {
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalysisIdeaUseCase } from '@usecases/index';

@Controller({ path: 'business' })
@ApiTags('Business Analysis')
export class BusinessAnalysisController {
  constructor(
    @Inject(BusinessAnalysisUsecasesProxyModule.ANALYSIS_IDEA_USECASE)
    private readonly analysisIdeaUseCase: UseCaseProxy<AnalysisIdeaUseCase>,
  ) {}

  @Post('/analysis-idea')
  async analysisIdea(@Body() body: BusinessIdeaDto) {
    const user = await this.analysisIdeaUseCase.getUseCase().execute({ body });
    return user;
  }
}
