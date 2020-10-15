import { Controller, Response, Get, Param, Post, Body, Put, Delete, HttpCode, Query } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { Agency as AgencyModel, AgencyWhereUniqueInput } from '@prisma/client';

@Controller('agency')
export class AgencyController {
    constructor(
        private readonly agencyService: AgencyService,
    ) { }

    @Post('/')
    @HttpCode(201)
    async signup(@Response() res, @Body() agencyData): Promise<AgencyModel> {
        const newUser = await this.agencyService.create(agencyData)
        if (newUser.hasOwnProperty('id')) return res.status(201).json(newUser)
        return res.status(400).json(newUser)
    }

    @Get('/')
    @HttpCode(200)
    async getMany(@Query() query): Promise<AgencyModel[]> {
        return this.agencyService.getMany(query)
    }

    @Get('/:id')
    @HttpCode(200)
    async getOne(@Param('id') id): Promise<AgencyModel> {
        return this.agencyService.getOne(id)
    }

    @Delete('/:id')
    @HttpCode(200)
    async delete(@Param('id') id): Promise<AgencyModel> {
        return this.agencyService.delete({ id: id });
    }

    @Put('/:id')
    @HttpCode(200)
    async update(@Body() data, @Param('id') id): Promise<AgencyModel> {
        return this.agencyService.update({
            data: { ...data },
            where: { id: id },
        });
    }

}
