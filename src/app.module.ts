import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'

import { AgencyModule } from './agency/agency.module'
import { AgencyService } from './agency/agency.service'
import configuration from './config/configuration'
import { HealthController } from './health.controller'
import { PrismaService } from './prisma/prisma.service'
import { UserModule } from './user/user.module'
import { ValidatorModule } from './utils/validator/validator.module'

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
