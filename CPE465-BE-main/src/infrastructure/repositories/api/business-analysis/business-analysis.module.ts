import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BusinessAnalysisService } from './business-analysis.service';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';

@Module({
  imports: [HttpModule, EnvironmentConfigModule],
  providers: [BusinessAnalysisService],
  exports: [BusinessAnalysisService],
})
export class BusinessAnalysisModule {}
