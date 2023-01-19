import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HoraryService } from './horary.service';
import { CreateHoraryDto } from './dto/create-horary.dto';
import { UpdateHoraryDto } from './dto/update-horary.dto';

@Controller('horary')
export class HoraryController {
  constructor(private readonly horaryService: HoraryService) {}

  @Post()
  create(@Body() createHoraryDto: CreateHoraryDto) {
    return this.horaryService.create(createHoraryDto);
  }

  @Get()
  findAll() {
    return this.horaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHoraryDto: UpdateHoraryDto) {
    return this.horaryService.update(+id, updateHoraryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horaryService.remove(+id);
  }
}
