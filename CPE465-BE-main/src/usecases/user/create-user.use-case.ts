import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import { UserRepository } from '@domain/repositories/database';
import { CreateUserDto } from '@infrastructure/dtos/user/create-user.dto';
import { User } from '@domain/model';
@Injectable()
export class CreateUserUseCase implements UseCase<
  {
    body: CreateUserDto;
  },
  any
> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(ctx: { body: CreateUserDto }): Promise<any> {
    let userwithemail = await this.userRepository.getByEmail(ctx.body.email);
    if (userwithemail) {
      return new BadRequestException('Dup email');
    }
    let user = await this.userRepository.create(
      new User({
        email: ctx.body.email,
        password: ctx.body.password,
        role: ctx.body.role,
      }),
    );
    return user;
  }
}
