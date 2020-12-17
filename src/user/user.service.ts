import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User, UserCreateInput } from '@prisma/client'
import * as bcrypt from 'bcrypt'

import { BadRequest } from '../interfaces/badRequest.interface'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async getOne(id): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                Address: true,
                Contact: true,
                Curriculum: true,
                Profile: true,
                Vacancy: true
            }
        })
        if(user) delete user.secret
        console.log(user)
        return user
    }

    async getMany(query?: {
        skip?: string
        take?: string
        orderBy?: any
    }, typeUser?): Promise<User[]> {
        const where = { id: { gt: 0 } }

        if (typeUser) where['role'] = typeUser

        const orderBy = query.orderBy ? query.orderBy.split(',') : []
        return this.prisma.user.findMany({
            skip: Number(query.skip) || 0,
            take: Number(query.take) || 100,
            orderBy: orderBy?.length ? { [orderBy[0]]: orderBy[1] } : {
                id: 'asc'
            },
            where: where
        })
    }

    async create(data: UserCreateInput): Promise<User | BadRequest | null> {
        const { email, cpf, nickname } = data

        data["Address"] = { create: {} }
        data["Contact"] = { create: {} }
        data["Curriculum"] = { create: {} }
        data["Profile"] = { create: {} }
        data["Vacancy"] = { create: [] }
        const include = {
            Address: true,
            Contact: true,
            Curriculum: true,
            Profile: true,
            Vacancy: true
        }

        if (cpf.length === 14) {
            data.role = "EMPLOYER"
            delete include.Curriculum
        }




        const unique = { email, cpf, nickname }
        try {
            data.secret = await bcrypt.hash(data.secret, 10)
            const existsUser = await this.getByUnique(unique, true)

            if (!existsUser.length) {
                const newUser = await this.prisma.user.create({
                    data,
                    include: include
                })
                delete newUser.secret
                return newUser
            }

            const badRequestMessage = () => {
                const message = {}
                existsUser.some(user => {
                    if (user.email === email) {
                        message["email"] = "Já existe e deve ser único"
                    }
                    if (user.cpf === cpf) {
                        message["cpf"] = "Já existe e deve ser único"
                    }
                    if (user.nickname === nickname) {
                        message["nickname"] = "Já existe e deve ser único"
                    }
                })
                return message
            }

            return {
                message: badRequestMessage() || "Chave única duplicada",
                error: "Chave única duplicada"
            }


        } catch (error) {
            console.dir(error)
            throw new HttpException("Dados incorretos fornecidos", HttpStatus.NOT_ACCEPTABLE)
        }
    }

    public async signIn(email: string, hashedPassword: string) {
        try {
            const user = await this.getByEmail(email)
            const isPasswordMatching = await bcrypt.compare(
                hashedPassword,
                user.secret
            )
            if (!isPasswordMatching) {
                throw new HttpException('Credenciais incorretas fornecidas', HttpStatus.BAD_REQUEST)
            }
            user.secret = undefined
            return user
        } catch (error) {
            throw new HttpException('Credenciais incorretas fornecidas', HttpStatus.BAD_REQUEST)
        }
    }

    async update(params: {
        data: any
        where: any
    }): Promise<User> {
        const { where, data } = params
        if (data.secret) data.secret = await bcrypt.hash(data.secret, 10)
        return this.prisma.user.update({
            data: data,
            where,
            // include: {
            //     Address: true,
            //     Contact: true,
            //     Curriculum: true,
            //     Profile: true,
            //     Vacancy: true
            // }
        })
    }

    async delete(user: any): Promise<User> {

        /* 
        delete user.Address
        delete user.Contact
        delete user.Curriculum
        delete user.Profile
        delete user.Vacancy

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                Address: { deleteMany: true },
                Contact: { deleteMany: true },
                Curriculum: { delete: true },
                Profile: { delete: true },
                Vacancy: { deleteMany: true },
            },
        })
        */

        await this.prisma.address.deleteMany({ where: { userid: user.id } })
        await this.prisma.contact.deleteMany({ where: { userid: user.id } })
        await this.prisma.curriculum.deleteMany({ where: { userid: user.id } })
        await this.prisma.profile.deleteMany({ where: { userid: user.id } })
        await this.prisma.vacancy.deleteMany({ where: { userid: user.id } })

        return await this.prisma.user.delete({
            where: { id: user.id }
        })
    }

    async getByEmail(email: string): Promise<User> {
        const getByEmail = await this.prisma.user.findUnique({
            where: { email },
        })
        return getByEmail
    }

    /**
     * @param unique Recebe os campos unique do usuário
     * @param compareNullValues Recebe uma condição para pesquisa que compara ou não valores nulos `default: false`
     * @description Este método verifica de acordo com os parâmetros, a existência desses usuários
     * @returns Retorna um array de todos os usuários que estão nesta condição
     * */
    async getByUnique(unique: any, compareNullValues = false): Promise<any[]> {
        const { email, cpf, nickname } = unique
        const select = 'SELECT email, cpf, nickname FROM public."User"'

        const andNotNicknameIsNull = compareNullValues ? 'AND NOT nickname ISNULL' : ''

        const condition = `cpf = '${cpf}' OR email = '${email}' OR (nickname = '${nickname}' ${andNotNicknameIsNull})`
        const getByUserWhereUniqueInput = await this.prisma.$queryRaw(`${select} WHERE ${condition};`)

        console.log(`Query existsUser`)
        console.dir(`${select} WHERE ${condition};`)

        return getByUserWhereUniqueInput
    }

}