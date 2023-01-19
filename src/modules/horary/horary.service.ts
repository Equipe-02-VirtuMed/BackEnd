import { Injectable } from '@nestjs/common';
import { CreateHoraryDto } from './dto/create-horary.dto';
import { UpdateHoraryDto } from './dto/update-horary.dto';

@Injectable()
export class HoraryService {
  create(createHoraryDto: CreateHoraryDto) {
    return 'This action adds a new horary';
  }

  findAll() {
    return `This action returns all horary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} horary`;
  }

  update(id: number, updateHoraryDto: UpdateHoraryDto) {
    return `This action updates a #${id} horary`;
  }

  remove(id: number) {
    return `This action removes a #${id} horary`;
  }
}
