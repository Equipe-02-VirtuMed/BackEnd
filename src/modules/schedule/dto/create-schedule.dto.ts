import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty({
    description: "Schedule's Date",
    example: '15/03/2023 11:00',
  })
  day: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "Doctor's email address",
    example: 'owner@virtumed.com',
  })
  doctoremail: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "Pacient's email address",
    example: 'owner@virtumed.com',
  })
  pacientemail: string;

  @IsString()
  @ApiProperty({
    description: "Doctor's residency",
    example: 'Cardiologista',
  })
  residency: string;
}
