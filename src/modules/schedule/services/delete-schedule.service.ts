import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../repository/schedule.repository';

@Injectable()
export class DeleteMyScheduleService {
  constructor(private scheduleRep: ScheduleRepository) {}

  async execute(id: string) {
    await this.scheduleRep.deleteMySchedule(id);

    return { status: 200, data: { message: 'Schedule has been deleted.' } };
  }
}
