import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';

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
