import { CreateUserDto } from '@infrastructure/dtos/user/create-user.dto';
import { UseCaseProxy } from '@infrastructure/usecases-proxy/usecases-proxy';
import { UserUsecasesProxyModule } from '@infrastructure/usecases-proxy/user-usecases-proxy.module';
import {
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from '@usecases/index';

@Controller({ path: 'user' })
@ApiTags('Users')
export class UserController {
  constructor(
    @Inject(UserUsecasesProxyModule.CREATE_USER_USECASE)
    private readonly createUserUseCase: UseCaseProxy<CreateUserUseCase>,
  ) {}

  @Post('/create')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.createUserUseCase.getUseCase().execute({ body });
    return user;
  }
}
