import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../repository/schedule.repository';

@Injectable()
export class FindScheduleByEmailService {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(email: string) {
    const schedulePacient =
      await this.scheduleRepository.findAllSchedulesPacient(email);
    const scheduleDoctor = await this.scheduleRepository.findAllSchedulesDoctor(
      email,
    );

    if (!schedulePacient && !scheduleDoctor) {
      return {
        status: 400,
        data: { message: 'Schedule not found' },
      };
    }

    if (schedulePacient) {
      return {
        status: 200,
        data: schedulePacient,
      };
    } else {
      return {
        status: 200,
        data: scheduleDoctor,
      };
    }
  }
}
