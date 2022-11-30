import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
=======
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
>>>>>>> 90d84025e656ca2442008acdfe19f2dca9c65e5f
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
