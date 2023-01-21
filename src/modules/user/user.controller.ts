/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import {
  GetUserByIdDto,
  GetUserByResidencyDto,
  UpdateUserRole,
  UserEmailDto,
} from './dto/get-user.dto';
import { UpdateMyAccountDto } from './dto/update-my-account.dto';
import {
  CreatePasswordHashDto,
  UpdateMyPasswordDto,
} from './dto/update-my-password.dto';
import { UserEntity } from './entity/user.entity';
import {
  CreateUserService,
  DeleteMyAccountService,
  FindAllUsersService,
  FindUserByIdService,
  MyAccountService,
  RecoveryPasswordByEmail,
  UpdateMyAccountService,
  UpdateMyPasswordService,
  UpdatePasswordByEmailService,
  UpdateUserRoleById,
  FindAllUsersResidency,
} from './services';

@ApiTags()
@Controller()
export class UserController {
  constructor(
    private createUserService: CreateUserService,
    private myAccountService: MyAccountService,
    private updateMyPasswordService: UpdateMyPasswordService,
    private updateMyAccountService: UpdateMyAccountService,
    private deleteMyAccountService: DeleteMyAccountService,
    private findUserByIdService: FindUserByIdService,
    private findAllUsersService: FindAllUsersService,
    private FindAllUsersResidency: FindAllUsersResidency,
    private updateUserRoleById: UpdateUserRoleById,
    private recoveryPasswordByEmail: RecoveryPasswordByEmail,
    private updatePasswordByEmailService: UpdatePasswordByEmailService,
  ) {}

  // ============================ Permissões LoggedUser ==========================

  @ApiTags('User')
  @Post('/create-user')
  @ApiOperation({
    summary: 'Create a User.',
  })
  async createUser(@Body() dto: CreateUserDto, @Res() res: Response) {
    const { status, data } = await this.createUserService.execute(dto);
    return res.status(status).send(data);
  }

  @ApiTags('User')
  @Get('/user/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get a User by id.',
  })
  async getUserById(
    @Param() { id }: GetUserByIdDto,
    @LoggedUser() user: UserEntity,
    @Res() res: Response,
  ) {
    const { status, data } = await this.findUserByIdService.execute(id);

    return res.status(status).send(data);
  }

  @ApiTags('User')
  @Get('user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all Users.',
  })
  async findAllUsers(@LoggedUser() user: UserEntity, @Res() res: Response) {
    const { status, data } = await this.findAllUsersService.execute();

    return res.status(status).send(data);
  }

  @ApiTags('User')
  @Get('user/residency')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all Users by residency.',
  })
  async findUserresidency(
    @LoggedUser() user: UserEntity,
    @Param() { residency }: GetUserByResidencyDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.FindAllUsersResidency.execute(
      residency,
    );
    console.log(data);
    return res.status(status).send(data);
  }

  @ApiTags('User')
  @Delete('user/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete user account.',
  })
  async deleteAccount(
    @LoggedUser() user: UserEntity,
    @Param() { id }: GetUserByIdDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.deleteMyAccountService.execute(id);

    return res.status(status).send(data);
  }

  @ApiTags('User')
  @Patch('update-role/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user role.',
  })
  async updateUserRole(
    @LoggedUser() user: UserEntity,
    @Param() { id }: GetUserByIdDto,
    @Body() updateUserRole: UpdateUserRole,
    @Res() res: Response,
  ) {
    const { status, data } = await this.updateUserRoleById.execute(
      id,
      updateUserRole,
    );
    return res.status(status).send(data);
  }

  @ApiTags('My account')
  @Get('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Return logged user`s profile.',
  })
  async myAccount(@LoggedUser() user: UserEntity, @Res() res: Response) {
    const { status, data } = await this.myAccountService.execute(user.id);
    return res.status(status).send(data);
  }

  @ApiTags('My account')
  @Put('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Upddates logged User`s password.',
  })
  async updateMyPassword(
    @LoggedUser() user: UserEntity,
    @Body() dto: UpdateMyPasswordDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.updateMyPasswordService.execute(
      dto,
      user.id,
    );
    return res.status(status).send(data);
  }

  @ApiTags('My account')
  @Patch('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Upddates logged User`s name or image.',
  })
  async updateMyAccount(
    @LoggedUser() user: UserEntity,
    @Body() dto: UpdateMyAccountDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.updateMyAccountService.execute(
      dto,
      user.id,
    );
    return res.status(status).send(data);
  }

  @ApiTags('My account')
  @Patch('recovery-password')
  @ApiOperation({
    summary: 'Send email to recovery password.',
  })
  async recoveryPasswordSendEmail(
    @Body() { email }: UserEmailDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.recoveryPasswordByEmail.execute(email);

    return res.status(status).send(data);
  }

  @ApiTags('My account')
  @Patch('update_password')
  @ApiOperation({
    summary: 'User update password.',
  })
  updatePassword(@Body() updatePassword: CreatePasswordHashDto) {
    return this.updatePasswordByEmailService.execute(updatePassword);
  }

  @ApiTags('My account')
  @Delete('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete logged user`s account.',
  })
  async DeleteMyAccount(@LoggedUser() user: UserEntity, @Res() res: Response) {
    const { status, data } = await this.deleteMyAccountService.execute(user.id);
    return res.status(status).send(data);
  }
}
