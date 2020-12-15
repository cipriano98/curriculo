import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Response } from '@nestjs/common'
import { Vacancy as VacancyModel } from '@prisma/client'

import { VacancyService } from './vacancy.service'

@Controller('user/vacancy')
export class VacancyController {
    constructor(
        private readonly vacancyService: VacancyService
    ) { }

    @Post('')
    @HttpCode(201)
    async create(@Body() vacancy): Promise<VacancyModel> {
        return await this.vacancyService.create(vacancy)
    }

    @Get('')
    @HttpCode(200)
    async getMany(): Promise<VacancyModel[]> {
        try {
            return await this.vacancyService.getMany()
        } catch (error) {
            console.dir(`Erro na Controller: ${error}`) 
        }
    }

    @Get('/:codeVacancy')
    @HttpCode(200)
    async getOne(@Param('codeVacancy') codeVacancy): Promise<VacancyModel> {
        return await this.vacancyService.getOne(Number(codeVacancy))
    }

    @Put('/:codeVacancy')
    @HttpCode(200)
    async update(@Body() vacancy, @Param('codeVacancy') codeVacancy: string): Promise<VacancyModel> {
        try {
            return await this.vacancyService.update(vacancy, Number(codeVacancy))
        } catch (error) {
            console.dir(`Erro na Controller: ${error}`) 
        }
    }
}
