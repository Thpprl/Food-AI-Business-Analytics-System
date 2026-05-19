import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';
import { ControllersModule } from './presentation/controllers/controllers.module';
import { DatabaseModule } from '@infrastructure/repositories/database/database.module';

@Module({
  imports: [EnvironmentConfigModule, ControllersModule , DatabaseModule],
})
export class AppModule {}
