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
}
