import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
export declare class AuthController {
    private userService;
    constructor(userService: UserService);
    signUp(res: any, data: any): Promise<User>;
    signIn(res: any, data: any): Promise<any>;
}
