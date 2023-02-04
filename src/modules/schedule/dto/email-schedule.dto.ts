import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class DoctorScheduleDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "Doctor's email address",
    example: 'owner@virtumed.com',
  })
  doctoremail: string;
}

export class PacientScheduleDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "Pacient's email address",
    example: 'owner@virtumed.com',
  })
  pacientemail: string;
}

export class EmailDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "Logged User's email address",
    example: 'owner@virtumed.com',
  })
  email: string;
}
