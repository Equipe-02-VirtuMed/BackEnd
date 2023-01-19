import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { SelectScheduleDto } from './dto/select-schedule.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@ApiTags('schedule')
@ApiBearerAuth()
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @ApiOperation({
    summary: 'Selecionar horário',
  })
  create(@Body() createScheduleDto: SelectScheduleDto) {
    return this.scheduleService.selectHorary(createScheduleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Tirar seleção do horário',
  })
  remove(@Param('id') id: string) {
    return this.scheduleService.unselectHorary(id);
  }

  @Get('user/:id')
  @ApiOperation({
    summary: 'Listar horário selecionado de um usuário',
  })
  getUserSchedule(@Param('id') id: string) {
    return this.scheduleService.getUserSchedule(id);
  }

  @Get('horary/:id')
  @ApiOperation({
    summary: 'Listar usuário que selecionaram esse horário',
  })
  getUsersWhoSelectHorary(@Param('id') id: string) {
    return this.scheduleService.getUsersWhoSelectHorary(id);
  }
}
