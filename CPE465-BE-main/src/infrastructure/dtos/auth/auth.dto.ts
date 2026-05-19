import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInPasswordRequestDto {
  @ApiProperty({
    description: 'The email of the user',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUpPasswordRequestDto {
  @ApiProperty({
    description: 'The email of the user',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RefreshTokenRequestDto {
  @ApiProperty({
    description: 'The email of the user',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;

}
