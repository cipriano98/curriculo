import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserValidator } from '@utils/validator/user.validate';
import { AuthController } from 'src/auth/auth.controller';

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
