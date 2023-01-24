import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../repository/schedule.repository';

@Injectable()
export class FindScheduleByPacientService {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(pacientemail: string) {
    const scheduleExists =
      await this.scheduleRepository.findAllSchedulesPacient(pacientemail);

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
