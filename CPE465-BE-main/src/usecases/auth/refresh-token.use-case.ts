import { UserRepository } from '@domain/repositories/database';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config.service';
import { RefreshTokenRequestDto } from '@infrastructure/dtos/auth/auth.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UseCase } from '@usecases/use-case';

@Injectable()
export class RefreshTokenUseCase implements UseCase<
  {
    body: RefreshTokenRequestDto;
  },
  any
> {
  private supabaseClient: SupabaseClient = null;

  constructor(
    private readonly configService: EnvironmentConfigService,
  ) {
    this.supabaseClient = createClient(
      this.configService.getSupabaseUrl(),
      this.configService.getSupabaseKey(),
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
  }

  async execute(ctx: { body: RefreshTokenRequestDto }): Promise<any> {
    let {
      data: { user, session },
      error,
    } = await this.supabaseClient.auth.refreshSession({
      refresh_token: ctx.body.refresh_token,
    });
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return {
      user,
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      token_type: session.token_type,
      expires_in: session.expires_in,
      expires_at: session.expires_at,
    };
  }
}
