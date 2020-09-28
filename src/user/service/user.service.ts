import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { BadRequest } from '@interfaces/badRequest.interface';
import {
  UserUpdateInput, User, UserCreateInput, UserWhereUniqueInput,
  ProfileCreateOneWithoutUserInput,
  UserWhereInput,
  UserOrderByInput,
} from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private utils: PrismaService,
  ) { }

  async getOne(id): Promise<User | null> {
    return this.prisma.user.findOne({
      where: {
        id: Number(id)
      },
    });
  }

  async getMany(query?: {
    skip?: string
    take?: string
    orderBy?: any
  }): Promise<User[]> {
    console.dir(`query >>>>>>>>>>`);
    console.dir(query);
    console.dir(`query <<<<<<<<<<`);
    let orderBy

    if (query.orderBy) orderBy = query.orderBy.split(',')

    return this.prisma.user.findMany({
      skip: Number(query.skip) || 0,
      take: Number(query.take) || 100,
      orderBy: orderBy?.length ? { [orderBy[0]]: orderBy[1] } : {
        id: 'asc'
      }
    });
  }

  async create(data: UserCreateInput): Promise<User | BadRequest | null> {
    try {
      const existsUser = await this.getByUserWhereUniqueInput(data, true)
      if (!existsUser.length) return this.prisma.user.create({ data });
      return { message: 'oi', error: 'tchau' }
    } catch (error) {
      return error.message
    }
  }

  async update(params: {
    where: UserWhereUniqueInput;
    data: UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async delete(where: UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async getByEmail(email: string): Promise<User> {
    const getByEmail = await this.prisma.user.findOne({
      where: { email },
    })
    return getByEmail
  }


  async getByUserWhereUniqueInput(unique: UserWhereUniqueInput, compareNullValues = false): Promise<UserWhereUniqueInput[]> {
    const { email, cpf, nickname } = unique
    const select = 'SELECT * FROM public."User"'

    const andNotNicknameIsNull = compareNullValues ? 'AND NOT nickname ISNULL' : ''

    const condition = `cpf = '${cpf}' OR email = '${email}' OR (nickname = '${nickname}' ${andNotNicknameIsNull})`
    const getByUserWhereUniqueInput = await this.prisma.$queryRaw(`${select} WHERE ${condition};`)
    console.dir(`${select} WHERE ${condition};`)

    return getByUserWhereUniqueInput
  }

}