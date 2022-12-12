import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'User`s email. Used in the login. Must be unique',
    example: 'johnsnow@outlook.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Name. User`s real name',
    example: 'Amaro Francisco',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Name. User`s real name',
    example: 'Doutor',
  })
  role?: string;

  @IsString()
  @ApiProperty({
    description: 'Doctor`s registro no Conselho Regional de Medicina (CRM).',
    example: '01.2345678-9',
  })
  crm?: string;

  @IsString()
  @ApiProperty({
    description: 'Name. User`s real name',
    example: 'Ginecologista',
  })
  residency?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(2)
  @ApiProperty({
    description: 'Doctor`s region of activity.',
    example: 'RJ',
  })
  uf?: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({
    description: 'Login password',
    example: 'Abcd@1234',
  })
  password: string;

  @ApiProperty({
    description: 'The password confirmation must be the same as the password',
    example: 'Abcd@1234',
  })
  confirmPassword: string;

  @IsUrl()
  @ApiProperty({
    description: 'User profile image',
    example: 'https://avatars.githubusercontent.com/u/88009922',
  })
  image: string;
}
