import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../repository/schedule.repository';

@Injectable()
export class FindAllScheduleService {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute() {
    const allSchedules = await this.scheduleRepository.findAllSchedule();

    return {
      status: 200,
      data: allSchedules,
    };
  }
}
