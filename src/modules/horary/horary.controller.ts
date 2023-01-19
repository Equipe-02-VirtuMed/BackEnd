import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HoraryService } from './horary.service';
import { CreateHoraryDto } from './dto/create-horary.dto';
import { UpdateHoraryDto } from './dto/update-horary.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard())
@ApiTags('horary')
@Controller('horary')
export class HoraryController {
  constructor(private readonly horaryService: HoraryService) {}

  @Post()
  @ApiOperation({
    summary: 'Criação de horário',
  })
  create(@Body() createHoraryDto: CreateHoraryDto) {
    return this.horaryService.create(createHoraryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listagem de horários',
  })
  findAll() {
    return this.horaryService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listagem de horários',
  })
  findOne(@Param('id') id: string) {
    return this.horaryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualização de hórarios',
  })
  update(@Param('id') id: string, @Body() updateHoraryDto: UpdateHoraryDto) {
    return this.horaryService.update(id, updateHoraryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Exclusão de um hórarios',
  })
  remove(@Param('id') id: string) {
    return this.horaryService.remove(id);
  }
}
