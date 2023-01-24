import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { ScheduleRepository } from '../repository/schedule.repository';

@Injectable()
export class UpdateMyScheduleService {
  constructor(private scheduleRep: ScheduleRepository) {}

  async execute(dto: CreateScheduleDto, id: string) {
    const schedule = await this.scheduleRep.updateMySchedule(dto, id);

    return { status: 200, data: schedule };
  }
}
