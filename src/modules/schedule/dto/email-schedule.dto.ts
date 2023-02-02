import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class DoctorScheduleDto {
  
  @ApiProperty({
    description: "Doctor's email address",
    example: 'owner@virtumed.com',
  })
  doctoremail: string;
}

export class PacientScheduleDto {

  @ApiProperty({
    description: "Doctor's email address",
    example: 'owner@virtumed.com',
  })
  pacientemail: string;
}
