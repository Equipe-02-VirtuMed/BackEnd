import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { ScheduleRepository } from '../repository/schedule.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateScheduleService {
  constructor(private scheduleRep: ScheduleRepository) {}

  async execute(data: CreateScheduleDto) {
    // const { doctoremail } = data;
    // const { pacientemail } = data;
    // const { day } = data;

    // const doctor = await this.scheduleRep.findAllSchedulesDoctor(doctoremail);
    // const pacient = await this.scheduleRep.findAllSchedulesPacient(pacientemail);

    // if (scheduleAlreadyExists) {
    //   return {
    //     status: 400,
    //     data: { message: 'Schedule is full.' },
    //   };
    // }

    const createSchedule = await this.scheduleRep.createSchedule(data);
    return {
      status: 201,
      data: createSchedule,
    };
  }
}
