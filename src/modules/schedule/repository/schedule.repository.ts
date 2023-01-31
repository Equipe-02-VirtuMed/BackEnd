import { PrismaClient } from '@prisma/client';
import { handleError } from 'src/utils/handle-error.util';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { ScheduleEntity } from '../entity/schedule.entity';

export class ScheduleRepository extends PrismaClient {
  async createSchedule(data: CreateScheduleDto) {
    const createSchedule = await this.schedule.create({ data });
    return createSchedule;
  }

  async findAllSchedule(): Promise<ScheduleEntity[]> {
    return this.schedule.findMany();
  }

  async findAllSchedulesDoctor(doctoremail: string): Promise<ScheduleEntity[]> {
    const all = this.schedule.findMany();

    return this.schedule
      .findMany({
        where: {
          doctoremail: {
            contains: doctoremail,
            mode: 'insensitive',
          },
        },
      })
      .catch(handleError);
  }

  async findAllSchedulesPacient(
    pacientemail: string,
  ): Promise<ScheduleEntity[]> {
    const all = this.schedule.findMany();

    return this.schedule
      .findMany({
        where: {
          doctoremail: {
            contains: pacientemail,
            mode: 'insensitive',
          },
        },
      })
      .catch(handleError);
  }

  // async findAllDates(day: string | Date): Promise<ScheduleEntity[]> {
  //   const all = this.schedule.findMany();

  //   return this.schedule
  //     .findMany({
  //       where: {
  //         day: {
  //           contains: day,
  //           mode: 'insensitive',
  //         },
  //       },
  //     })
  //     .catch(handleError);
  // }

  async findScheduleById(id: string): Promise<ScheduleEntity> {
    return this.schedule.findUnique({ where: { id } }).catch(handleError);
  }

  async updateMySchedule(updateScheduleDto: CreateScheduleDto, id: string) {
    const data = { ...updateScheduleDto };
    return this.schedule.update({ where: { id }, data }).catch(handleError);
  }

  async deleteMySchedule(id: string) {
    return this.schedule.delete({ where: { id } }).catch(handleError);
  }
}
