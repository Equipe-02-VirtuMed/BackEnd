import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateHoraryDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Numero do horário',
    example: '11',
  })
  name: number;

}