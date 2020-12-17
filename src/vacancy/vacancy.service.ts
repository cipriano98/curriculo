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

    async getMany(query?): Promise<Vacancy[]> {
        try {
            const where = {
                codeVacancy: {
                    gt: 0
                },
                userid: Number(query.userId),
            }

            if (query.userId) {
                delete where.codeVacancy
                where['userid'] = Number(query.userId)      
            }
            else delete where.userid

            const vacancy = await this.prisma.vacancy.findMany({
                where: where,
                orderBy: { codeVacancy: "asc" },
                include: {
                    Interested: true,
                }
            })

            return vacancy

        } catch (error) {
            console.dir(`Erro na Service:`)
            console.dir(error)
            console.dir(error.name)
            console.dir(error.message)
        }
    }

    async getOne(codeVacancy: number): Promise<Vacancy | null> {
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

    async update(vacancy: Vacancy, codeVacancy: number, userId?: number): Promise<Vacancy> {
        try {
            if (userId) {
                vacancy['Interested'] = { connect: [{ id: userId }] }
            }
            console.dir(vacancy);
            return await this.prisma.vacancy.update({
                data: {
                    ...vacancy
                },
                where: {
                    codeVacancy
                },
                include: {
                    Interested: true,
                }
            })
        } catch (error) {
            console.dir(`Erro na Service: ${error}`)
        }
    }

}
