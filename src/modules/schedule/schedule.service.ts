import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { PrismaService } from 'prisma/prisma/prisma.service';
import { SelectScheduleDto } from './dto/select-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { Horary } from '../horary/entities/horary.entity';
import { Prisma } from '@prisma/client';
import { handleErrorUnique } from 'src/utils/handle-error-unique.util';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async selectHorary(dto: SelectScheduleDto): Promise<Schedule> {
    await this.verifyId(dto.userId);

    const horary: Horary = await this.prisma.horary.findUnique({
      where: { name: dto.horaryName },
    });

    if (!horary) {
      throw new NotFoundException(`Hórario ${dto.horaryName} não encontrado`);
    }

    const data: any = {
      user: {
        connect: {
          id: dto.userId,
        },
      },
      horary: {
        connect: {
          name: dto.horaryName,
        },
      },
    };

    return this.prisma.schedule.create({ data }).catch(handleErrorUnique);
  }

  async unselectHorary(id: string) {
    const schedule: Schedule = await this.prisma.schedule.findUnique({
      where: { id },
    });

    if (!schedule) {
      throw new NotFoundException(`Entrada de id ${id} nao encontrada`);
    }

    return this.prisma.schedule.delete({ where: { id } });
  }

  async getUserSchedule(id: string): Promise<Schedule[]> {
    await this.verifyId(id);
    return this.prisma.schedule.findMany({ where: { userId: id } });
  }

  async getUsersWhoSelectHorary(id: string) {
    const horary: Horary = await this.prisma.horary.findUnique({
      where: { id },
    });

    if (!horary) {
      throw new NotFoundException(`Entrada de id ${id} nao encontrada`);
    }

    return this.prisma.schedule.findMany({ where: { horary: { id } } });
  }

  async verifyId(id: string): Promise<void | never> {
    const user: UserEntity = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Entrada de id ${id} nao encontrada`);
    }
  }
}
