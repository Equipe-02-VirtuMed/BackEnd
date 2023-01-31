import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../repository/schedule.repository';

@Injectable()
export class FindScheduleByDoctorService {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(doctoremail: string) {
    const scheduleExists = await this.scheduleRepository.findAllSchedulesDoctor(
      doctoremail,
    );

    if (!scheduleExists) {
      return {
        status: 400,
        data: { message: 'Schedule not found' },
      };
    }

    return {
      status: 200,
      data: scheduleExists,
    };
  }
}
