import { Module } from '@nestjs/common'

import { AuthController } from '../auth/auth.controller'
import { PrismaService } from '../prisma/prisma.service'
import { UserValidator } from '../utils/validator/user.validate'
import { UserController } from './user.controller'
import { UserService } from './user.service'

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
