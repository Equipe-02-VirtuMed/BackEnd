import { PartialType } from '@nestjs/swagger';
import { CreateHoraryDto } from './create-horary.dto';

export class UpdateHoraryDto extends PartialType(CreateHoraryDto) {}
