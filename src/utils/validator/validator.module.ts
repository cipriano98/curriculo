import { Module } from '@nestjs/common'

import { UserValidator } from './user.validate'

@Module({
    imports: [ ],
    controllers: [ ],
    providers: [
        UserValidator
    ],
})
export class ValidatorModule {}
