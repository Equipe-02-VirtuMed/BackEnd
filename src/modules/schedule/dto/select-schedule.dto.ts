import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SelectScheduleDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário que está selecionando a hora',
    example: '28affa15-e38a-4b12-b607-edbd2d1b3fd',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Horário que está sendo selecionado',
    example: '11',
  })
  horaryName: number;
}
