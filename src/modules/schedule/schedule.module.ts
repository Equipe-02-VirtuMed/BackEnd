import { ScheduleController } from './schedule.controller';
import { Module } from '@nestjs/common';
import {
  CreateScheduleService,
  DeleteMyScheduleService,
  FindAllScheduleService,
  FindScheduleByDoctorService,
  FindScheduleByPacientService,
  UpdateMyScheduleService,
} from './services';
import { PassportModule } from '@nestjs/passport';
import { ScheduleRepository } from './repository/schedule.repository';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ScheduleController],
  providers: [
    CreateScheduleService,
    FindAllScheduleService,
    FindScheduleByDoctorService,
    FindScheduleByPacientService,
    UpdateMyScheduleService,
    DeleteMyScheduleService,
    ScheduleRepository,
  ],
  exports: [ScheduleRepository],
})
export class ScheduleModule {}
