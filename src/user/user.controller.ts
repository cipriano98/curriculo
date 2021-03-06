import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Response } from '@nestjs/common'
import { User as UserModel } from '@prisma/client'

import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('/')
    @HttpCode(201)
    async signUp(@Response() res, @Body() userData): Promise<UserModel> {
        const newUser = await this.userService.create(userData)
        if (newUser.hasOwnProperty('id')) return res.status(201).json(newUser)
        return res.status(400).json(newUser)
    }

    @Get('/')
    @HttpCode(200)
    async getMany(@Query() query): Promise<UserModel[]> {
        return this.userService.getMany(query)
    }

    @Get('/candidate')
    @HttpCode(200)
    async getManyCandidates(@Query() query): Promise<UserModel[]> {
        return this.userService.getMany(query, 'CANDIDATE')
    }

    @Get('/employer')
    @HttpCode(200)
    async getManyEmployers(@Query() query): Promise<UserModel[]> {
        return this.userService.getMany(query, 'EMPLOYER')
    }

    @Get('/:id')
    @HttpCode(200)
    async getOne(@Param('id') id): Promise<UserModel> {
        return this.userService.getOne(id)
    }

    @Delete('/:id')
    @HttpCode(200)
    async delete(@Param('id') id: string): Promise<UserModel> {
        return this.userService.delete({ id: Number(id) })
    }

    @Put('/:id')
    @HttpCode(200)
    async update(@Body() data, @Param('id') id: string): Promise<UserModel> {
        return this.userService.update({
            data: { ...data },
            where: { id: Number(id) },
        })
    }

}