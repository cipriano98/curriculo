import { Body, Controller, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common'
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
    async getMany(@Query() query?): Promise<VacancyModel[]> {
        try {
            return await this.vacancyService.getMany(query)
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

    @Put('/:codeVacancy/connect/:userId')
    @HttpCode(200)
    async connect(@Body() vacancy, @Param('codeVacancy') codeVacancy: string, @Param('userId') userId: string): Promise<VacancyModel> {
        try {
            return await this.vacancyService.update(vacancy, Number(codeVacancy), Number(userId))
        } catch (error) {
            console.dir(`Erro na Controller: ${error}`) 
        }
    }
}
