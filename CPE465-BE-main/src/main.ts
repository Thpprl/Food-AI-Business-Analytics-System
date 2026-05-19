import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable CORS for all origins, methods, and headers
  app.enableCors();

   const config = new DocumentBuilder()
    .setTitle('CPE465')
    .setDescription('The CPE465 API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  const configService = app.get(EnvironmentConfigService);
  
  const PORT = configService.getPort();
  await app.listen(PORT ?? 3000);
}
bootstrap();
