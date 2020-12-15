import { Injectable } from '@nestjs/common'
import { Vacancy } from '@prisma/client'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class VacancyService {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(vacancy: Vacancy): Promise<Vacancy> {
        return await this.prisma.vacancy.create({
            data: { ...vacancy }
        })
    }

    // async getMany(query?: {
    //     skip?: string
    //     take?: string
    //     orderBy?: any
    // }): Promise<Vacancy[]> {
    //     console.dir('Service')
    //     const orderBy = query.orderBy ? query.orderBy.split(',') : []
    //     return this.prisma.vacancy.findMany({
    //         skip: Number(query.skip) || 0,
    //         take: Number(query.take) || 100,
    //         orderBy: orderBy?.length ? { [orderBy[0]]: orderBy[1] } : {
    //             codeVacancy: 'asc'
    //         }
    //     })
    // }

    async getMany(): Promise<Vacancy[]> {
        try {
            return await this.prisma.vacancy.findMany({
                include: {
                    Interested: true,
                }
            })
        } catch (error) {
            console.dir(`Erro na Service: ${error}`)
        }
    }

    async getOne(codeVacancy: number): Promise<Vacancy | null> {
        console.dir(codeVacancy)
        const vacancy = await this.prisma.vacancy.findUnique({
            where: {
                codeVacancy
            },
            include: {
                Interested: true,
            }
        })
        return vacancy
    }

    async update(vacancy: Vacancy, codeVacancy: number): Promise<Vacancy> {
        console.dir(vacancy)
        console.dir(codeVacancy)
        try {
            return await this.prisma.vacancy.update({
                data: { ...vacancy },
                where: {
                    codeVacancy
                }
            })
        } catch (error) {
            console.dir(`Erro na Service: ${error}`)
        }
    }
}
