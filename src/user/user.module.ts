import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { UserValidator } from '@utils/validator/user.validate';

@Module({
    imports: [ ],
    controllers: [UserController],
    providers: [
        UserService,
        PrismaService,
        UserValidator
    ],
})
export class UserModule { }
