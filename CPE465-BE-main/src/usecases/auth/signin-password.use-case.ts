import { UserRepository } from '@domain/repositories/database/user.repository';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config.service';
import { SignInPasswordRequestDto } from '@infrastructure/dtos/auth/auth.dto';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UseCase } from '@usecases/use-case';

@Injectable()
export class SignInPasswordUseCase implements UseCase<
  {
    body: SignInPasswordRequestDto;
  },
  any
> {
  private supabaseClient: SupabaseClient = null;

  constructor(
    private readonly configService: EnvironmentConfigService,
    private readonly userRepository: UserRepository,
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

  async execute(ctx: { body: SignInPasswordRequestDto }): Promise<any> {
    const { user, session } = await this.signInUser(
      ctx.body.email,
      ctx.body.password,
    );
    return {
      user: user,
      session: {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        token_type: session.token_type,
        expires_in: session.expires_in,
        expires_at: session.expires_at,
      },
    };
  }
  
  private async signInUser(email: string, password: string) {
    const { data, error } = await this.supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      if (error.message === 'Invalid login credentials') {
        throw new UnauthorizedException({
          message: 'Invalid email or password',
          code: 'INVALID_EMAIL_OR_PASSWORD',
        });
      }
      throw new InternalServerErrorException(error.message);
    }
    return { user: data.user, session: data.session };
  }
}
