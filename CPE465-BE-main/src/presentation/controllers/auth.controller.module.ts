import { RefreshTokenRequestDto, SignInPasswordRequestDto, SignUpPasswordRequestDto } from '@infrastructure/dtos/auth/auth.dto';
import { CreateUserDto } from '@infrastructure/dtos/user/create-user.dto';
import { AuthUsecasesProxyModule } from '@infrastructure/usecases-proxy/auth-usecases-proxy.module';
import { UseCaseProxy } from '@infrastructure/usecases-proxy/usecases-proxy';
import { UserUsecasesProxyModule } from '@infrastructure/usecases-proxy/user-usecases-proxy.module';
import {
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RefreshTokenUseCase, SignInPasswordUseCase, SignUpPasswordUseCase } from '@usecases/index';

@Controller({ path: 'auth' })
@ApiTags('Auths')
export class AuthController {
  constructor(
    @Inject(AuthUsecasesProxyModule.SIGN_IN_PASSWORD_USECASE)
    private readonly signInPasswordUseCase: UseCaseProxy<SignInPasswordUseCase>,
    @Inject(AuthUsecasesProxyModule.SIGN_UP_PASSWORD_USECASE)
    private readonly signUpPasswordUseCase: UseCaseProxy<SignUpPasswordUseCase>,
    @Inject(AuthUsecasesProxyModule.REFRESH_TOKEN_USECASE)
    private readonly refreshTokenUseCase: UseCaseProxy<RefreshTokenUseCase>,
  ) {}

  @Post('/signin')
  async signIn(@Body() body: SignInPasswordRequestDto) {
    const user = await this.signInPasswordUseCase.getUseCase().execute({ body });
    return user;
  }

  @Post('/signup')
  async signUp(@Body() body: SignUpPasswordRequestDto) {
    const user = await this.signUpPasswordUseCase.getUseCase().execute({ body });
    return user;
  }

  @Post('/refresh-token')
  async refreshToken(@Body() body: RefreshTokenRequestDto) {
    const user = await this.refreshTokenUseCase.getUseCase().execute({ body });
    return user;
  }
}
