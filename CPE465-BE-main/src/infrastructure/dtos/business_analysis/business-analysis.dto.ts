import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BusinessIdeaDto {
  @ApiProperty({
    description: 'The business idea to analyze',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  idea: string;
}
