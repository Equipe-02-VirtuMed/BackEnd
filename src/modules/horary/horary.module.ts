import { Module } from '@nestjs/common';
import { HoraryService } from './horary.service';
import { HoraryController } from './horary.controller';
import { JwtStrategy } from 'src/configs/jwt.strategy';
import { PrismaModule } from 'prisma/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), PrismaModule],
  controllers: [HoraryController],
  providers: [HoraryService, JwtStrategy],
})
export class HoraryModule {}
