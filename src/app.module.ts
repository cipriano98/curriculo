import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    UserModule,
    TerminusModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    })
  ],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule { }
