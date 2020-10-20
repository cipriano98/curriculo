import { PrismaService } from '../prisma/prisma.service';
import { UserUpdateInput, User, UserCreateInput, UserWhereUniqueInput } from '@prisma/client';
import { BadRequest } from '../interfaces/badRequest.interface';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getOne(id: any): Promise<User | null>;
    getMany(query?: {
        skip?: string;
        take?: string;
        orderBy?: any;
    }): Promise<User[]>;
    create(data: UserCreateInput): Promise<User | BadRequest | null>;
    signIn(email: string, hashedPassword: string): Promise<User>;
    update(params: {
        data: UserUpdateInput;
        where: UserWhereUniqueInput;
    }): Promise<User>;
    delete(where: UserWhereUniqueInput): Promise<User>;
    getByEmail(email: string): Promise<User>;
    getByUnique(unique: UserWhereUniqueInput, compareNullValues?: boolean): Promise<UserWhereUniqueInput[]>;
}
