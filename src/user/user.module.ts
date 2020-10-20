import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { AuthController } from 'src/auth/auth.controller';
import { UserValidator } from 'src/utils/validator/user.validate';

@Module({
    imports: [],
    controllers: [
        UserController,
        AuthController
    ],
    providers: [
        UserService,
        PrismaService,
        UserValidator,
    ],
})
export class UserModule { }
