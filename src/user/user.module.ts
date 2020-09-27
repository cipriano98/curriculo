import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';

@Module({
    imports: [
        
    ],
    controllers: [UserController],
    providers: [UserService, PrismaService],
})
export class UserModule { }
