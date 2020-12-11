import { Injectable } from '@nestjs/common'
import { Agency, AgencyCreateInput, AgencyOrderByInput, AgencyUpdateInput, AgencyWhereInput, AgencyWhereUniqueInput } from '@prisma/client'

import { BadRequest } from '../interfaces/badRequest.interface'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AgencyService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly utils: PrismaService,
    ) { }

    async getOne(id): Promise<Agency | null> {
        return this.prisma.agency.findUnique({
            where: {
                id
            },
        })
    }

    async getMany(query?: {
        skip?: string
        take?: string
        orderBy?: any
    }): Promise<Agency[]> {

        const orderBy = query.orderBy ? query.orderBy.split(',') : []

        return this.prisma.agency.findMany({
            skip: Number(query.skip) || 0,
            take: Number(query.take) || 100,
            orderBy: orderBy?.length ? { [orderBy[0]]: orderBy[1] } : {
                id: 'asc'
            }
        })
    }

    async create(data: AgencyCreateInput): Promise<Agency | BadRequest | null> {
        const { registrofederal, site } = data
        try {
            const existsAgency = await this.getByAgencyWhereUniqueInput({ registrofederal, site })
            existsAgency.find(agency => agency.registrofederal === data.registrofederal)
            console.log(`existsAgency: ${existsAgency.length ? true : false}`)
            if (!existsAgency.length) {
                const {  } = data
                return await this.prisma.agency.create({ data })
            }

            return {
                message: 'Registro federal e site devem ser únicos',
                error: 'Chave única duplicada'
            }
        } catch (error) {
            return error.message
        }
    }

    async update(params: {
        data: AgencyUpdateInput
        where: AgencyWhereUniqueInput
    }): Promise<Agency> {
        const { where, data } = params
        return this.prisma.agency.update({
            data,
            where
        })
    }

    async delete(where: AgencyWhereUniqueInput): Promise<Agency> {
        return this.prisma.agency.delete({
            where,
        })
    }

    /**
     * @param unique Recebe os campos unique do usuário
     * @param compareNullValues Recebe uma condição para pesquisa que compara ou não valores nulos `default: false`
     * @description Este método verifica de acordo com os parâmetros, a existência desses usuários
     * @returns Retorna um array de todos os usuários que estão nesta condição
     * */
    async getByAgencyWhereUniqueInput(unique: AgencyWhereUniqueInput): Promise<AgencyWhereUniqueInput[]> {
        const { registrofederal, site } = unique
        const select = 'SELECT * FROM public."Agency"'

        const condition = `registrofederal = '${registrofederal}' OR site = '${site}'`
        const getByAgencyWhereUniqueInput = await this.prisma.$queryRaw(`${select} WHERE ${condition}`)
        console.log(`Query existsAgency`)
        console.dir(`${select} WHERE ${condition}`)

        return getByAgencyWhereUniqueInput
    }

}