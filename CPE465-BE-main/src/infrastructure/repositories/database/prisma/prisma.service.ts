import { IPrismaService } from '@domain/repositories/database/prisma/prisma.interface';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config.service';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// import { withOptimize } from "@prisma/extension-optimize";

@Injectable()
export class PrismaService extends PrismaClient implements IPrismaService {
  constructor(
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {
    super({
      // log: environmentConfigService.getPrismaLogLevel(),
    });
    // this.$extends(withOptimize({
    //   enable: true
    // }));
  }
}
