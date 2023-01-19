import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { JwtStrategy } from 'src/configs/jwt.strategy';
import { PrismaModule } from 'prisma/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ScheduleController],
  providers: [ScheduleService, JwtStrategy],
})
export class ScheduleModule {}
