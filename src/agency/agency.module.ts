import { Module } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { AgencyController } from './agency.controller'
import { AgencyService } from './agency.service'

@Module({
    imports: [],
    controllers: [
        AgencyController
    ],
    providers: [
        AgencyService,
        PrismaService
    ],
})
export class AgencyModule { }
