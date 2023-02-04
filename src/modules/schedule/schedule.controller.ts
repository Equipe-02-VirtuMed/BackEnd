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
import { LoggedAdmin } from '../auth/decorator/logged-owner.decorator';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { GetUserByIdDto } from '../user/dto/get-user.dto';
import { UserEntity } from '../user/entity/user.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import {
  DoctorScheduleDto,
  EmailDto,
  PacientScheduleDto,
} from './dto/email-schedule.dto';
import {
  CreateScheduleService,
  DeleteMyScheduleService,
  FindAllScheduleService,
  FindScheduleByDoctorService,
  FindScheduleByPacientService,
  UpdateMyScheduleService,
} from './services';

@ApiTags()
@Controller()
export class ScheduleController {
  constructor(
    private createScheduleService: CreateScheduleService,
    private findAllScheduleService: FindAllScheduleService,
    private findScheduleByDoctorService: FindScheduleByDoctorService,
    private findScheduleByPacientService: FindScheduleByPacientService,
    private updateMySchedule: UpdateMyScheduleService,
    private deleteMyScheduleService: DeleteMyScheduleService,
  ) {}

  @ApiTags('Schedule')
  @Post('/create-schedule')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a Schedule.',
  })
  async createUser(@Body() dto: CreateScheduleDto, @Res() res: Response) {
    const { status, data } = await this.createScheduleService.execute(dto);
    return res.status(status).send(data);
  }

  @ApiTags('Schedule')
  @Get('schedule')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all Schedules.',
  })
  async findAllUsers(@Res() res: Response) {
    const { status, data } = await this.findAllScheduleService.execute();

    return res.status(status).send(data);
  }

  @ApiTags('Schedule')
  @Get('schedule/doctor/:doctoremail')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all Doctor by schedule.',
  })
  async findDoctorschedule(
    @LoggedAdmin() user: UserEntity,
    @Param() { doctoremail }: DoctorScheduleDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.findScheduleByDoctorService.execute(
      doctoremail,
    );
    return res.status(status).send(data);
  }

  @ApiTags('Schedule')
  @Get('schedule/pacient/:pacientemail')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all Pacient by schedule.',
  })
  async findPacientschedule(
    @LoggedAdmin() user: UserEntity,
    @Param() { pacientemail }: PacientScheduleDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.findScheduleByPacientService.execute(
      pacientemail,
    );
    return res.status(status).send(data);
  }

  @ApiTags('Schedule')
  @Get('schedule/myschedule/:email')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all Logged User Schedule.',
  })
  async findMySchedule(@LoggedAdmin() user: UserEntity, @Res() res: Response) {
    const { status, data } = await this.findScheduleByPacientService.execute(
      user.email,
    );
    return res.status(status).send(data);
  }

  @ApiTags('Schedule')
  @Patch('update-schedule/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update schedule.',
  })
  async updateUserRole(
    @Param() { id }: GetUserByIdDto,
    @Body() updateSchedule: CreateScheduleDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.updateMySchedule.execute(
      updateSchedule,
      id,
    );
    return res.status(status).send(data);
  }

  @ApiTags('Schedule')
  @Delete('schedule/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete schedule.',
  })
  async deleteAccount(@Param() { id }: GetUserByIdDto, @Res() res: Response) {
    const { status, data } = await this.deleteMyScheduleService.execute(id);

    return res.status(status).send(data);
  }
}
