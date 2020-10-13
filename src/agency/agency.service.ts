import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class AgencyService {

    // constructor(
    //     private readonly prisma: PrismaService,
    //     private readonly utils: PrismaService,
    // ) { }

    // async getOne(id): Promise<Agency | null> {
    //     return this.prisma.user.findOne({
    //         where: {
    //             id: Number(id)
    //         },
    //     });
    // }

    // async getMany(query?: {
    //     skip?: string
    //     take?: string
    //     orderBy?: any
    // }): Promise<User[]> {

    //     const orderBy = query.orderBy ? query.orderBy.split(',') : []

    //     return this.prisma.user.findMany({
    //         skip: Number(query.skip) || 0,
    //         take: Number(query.take) || 100,
    //         orderBy: orderBy?.length ? { [orderBy[0]]: orderBy[1] } : {
    //             id: 'asc'
    //         }
    //     });
    // }

    // async create(data: UserCreateInput): Promise<User | BadRequest | null> {
    //     try {
    //         data.secret = await bcrypt.hash(data.secret, 10);
    //         const existsUser = await this.getByUserWhereUniqueInput(data, true)
    //         // existsUser.find(user => user.cpf === data.cpf);
    //         console.log(`existsUser: ${existsUser.length ? true : false}`)
    //         if (!existsUser.length) {
    //             // const {  } = data
    //             return await this.prisma.user.create({ data })
    //         }

    //         // existsUser.some(element => {
    //         //     console.dir(element)
    //         // })

    //         return {
    //             message: 'email, cpf, nickname devem ser únicos',
    //             error: 'Chave única duplicada'
    //         }
    //     } catch (error) {
    //         return error.message
    //     }
    // }

    // public async sigin(email: string, hashedPassword: string) {
    //     try {
    //         const user = await this.getByEmail(email);
    //         const isPasswordMatching = await bcrypt.compare(
    //             hashedPassword,
    //             user.secret
    //         );
    //         if (!isPasswordMatching) {
    //             throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    //         }
    //         user.secret = undefined;
    //         return user;
    //     } catch (error) {
    //         throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    //     }
    // }

    // async update(params: {
    //     data: UserUpdateInput;
    //     where: UserWhereUniqueInput;
    // }): Promise<User> {
    //     const { where, data } = params;
    //     data.secret = await bcrypt.hash(data.secret, 10);
    //     return this.prisma.user.update({
    //         data,
    //         where
    //     });
    // }

    // async delete(where: UserWhereUniqueInput): Promise<User> {
    //     return this.prisma.user.delete({
    //         where,
    //     });
    // }

    // async getByEmail(email: string): Promise<User> {
    //     const getByEmail = await this.prisma.user.findOne({
    //         where: { email },
    //     })
    //     return getByEmail
    // }


    // async getByUserWhereUniqueInput(unique: UserWhereUniqueInput, compareNullValues = false): Promise<UserWhereUniqueInput[]> {
    //     const { email, cpf, nickname } = unique
    //     const select = 'SELECT * FROM public."User"'

    //     const andNotNicknameIsNull = compareNullValues ? 'AND NOT nickname ISNULL' : ''

    //     const condition = `cpf = '${cpf}' OR email = '${email}' OR (nickname = '${nickname}' ${andNotNicknameIsNull})`
    //     const getByUserWhereUniqueInput = await this.prisma.$queryRaw(`${select} WHERE ${condition};`)
    //     console.log(`Query existsUser`)
    //     console.dir(`${select} WHERE ${condition};`)

    //     return getByUserWhereUniqueInput
    // }
}
