import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { HealthController } from './health.controller';
import { ValidatorModule } from './utils/validator/validator.module';
import { AgencyService } from './agency/agency.service';
import { AgencyModule } from './agency/agency.module';

@Module({
    imports: [
        UserModule,
        TerminusModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration]
        }),
        ValidatorModule,
        AgencyModule
    ],
    controllers: [HealthController],
    providers: [
        PrismaService,
        AgencyService
    ],
})
export class AppModule { }
