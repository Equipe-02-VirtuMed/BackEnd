import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma/prisma.service';
import { handleErrorUnique } from 'src/utils/handle-error-unique.util';
import { CreateHoraryDto } from './dto/create-horary.dto';
import { UpdateHoraryDto } from './dto/update-horary.dto';
import { Horary } from './entities/horary.entity';

@Injectable()
export class HoraryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHoraryDto: CreateHoraryDto): Promise<Horary | void> {
    return this.prisma.horary
      .create({ data: createHoraryDto })
      .catch(handleErrorUnique);
  }

  findAll(): Promise<Horary[]> {
    return this.prisma.horary.findMany();
  }

  async verifyId(id: string): Promise<Horary> {
    const horary: Horary = await this.prisma.horary.findUnique({
      where: { id },
    });

    if (!horary) {
      throw new NotFoundException(`Entrada de id ${id} nao encontrada`);
    }

    return horary;
  }

  findOne(id: string) {
    return this.verifyId(id);
  }

  async update(id: string, updateHoraryDto: UpdateHoraryDto) {
    await this.verifyId(id);

    return this.prisma.horary
      .update({ where: { id }, data: updateHoraryDto })
      .catch(handleErrorUnique);
  }

  async remove(id: string) {
    await this.verifyId(id);

    return this.prisma.horary.delete({ where: { id } });
  }
}
