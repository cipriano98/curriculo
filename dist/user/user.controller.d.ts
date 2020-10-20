import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signUp(res: any, userData: any): Promise<UserModel>;
    getMany(query: any): Promise<UserModel[]>;
    getOne(id: any): Promise<UserModel>;
    delete(id: string): Promise<UserModel>;
    update(data: any, id: string): Promise<UserModel>;
}
