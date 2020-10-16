import { Controller, Response, Get, Param, Post, Body, Put, Delete, HttpCode, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        // private readonly postService: PostService,
    ) { }

    @Post('/')
    @HttpCode(201)
    async signup(@Response() res, @Body() userData): Promise<UserModel> {
        const newUser = await this.userService.create(userData)
        if (newUser.hasOwnProperty('id')) return res.status(201).json(newUser)
        return res.status(400).json(newUser)
    }

    @Get('/')
    @HttpCode(200)
    async getMany(@Query() query): Promise<UserModel[]> {
        return this.userService.getMany(query)
    }

    @Get('/:id')
    @HttpCode(200)
    async getOne(@Param('id') id): Promise<UserModel> {
        return this.userService.getOne(id)
    }

    @Delete('/:id')
    @HttpCode(200)
    async delete(@Param('id') id: string): Promise<UserModel> {
        return this.userService.delete({ id: Number(id) });
    }

    @Put('/:id')
    @HttpCode(200)
    async update(@Body() data, @Param('id') id: string): Promise<UserModel> {
        return this.userService.update({
            data: { ...data },
            where: { id: Number(id) },
        });
    }

}