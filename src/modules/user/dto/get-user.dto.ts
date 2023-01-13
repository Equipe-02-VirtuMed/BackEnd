import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class GetUserByIdDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's Id",
    example: 'asfdagdfs',
  })
  id: string;
}

export class UpdateUserRole {
  @IsEnum(['Admin', 'Pacient', 'Doctor'])
  @IsIn(['Admin', 'Pacient', 'Doctor'])
  @ApiProperty({
    description: 'Grants user access to routes based on roles',
    example: 'Admin',
  })
  role: UserRole;
}

export class UserEmailDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's email address",
    example: 'owner@virtumed.com',
  })
  email: string;
}
