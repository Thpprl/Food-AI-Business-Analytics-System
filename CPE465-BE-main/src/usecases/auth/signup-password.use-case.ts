import { UserRepository } from '@domain/repositories/database/user.repository';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config.service';
import { SignUpPasswordRequestDto } from '@infrastructure/dtos/auth/auth.dto';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UseCase } from '@usecases/use-case';

@Injectable()
export class SignUpPasswordUseCase implements UseCase<
  {
    body: SignUpPasswordRequestDto;
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

  async execute(ctx: { body: SignUpPasswordRequestDto }): Promise<any> {
    const { user } = await this.signUpUser(ctx.body.email, ctx.body.password);
    return {
      user: user,
    };
  }
  private async signUpUser(email: string, password: string) {
    const { data, error } = await this.supabaseClient.auth.signUp({
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
    let user = await this.userRepository.getByEmail(email);
    if (!user) {
      user = await this.userRepository.create({
        id: data.user.id,
        email: data.user.email,
        created_at: new Date(),
        password: password,
      });
    }
    return { user: data.user };
  }
}
