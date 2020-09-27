import { Controller, Response, Get, Param, Post, Body, Put, Delete, HttpCode, Query } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User as UserModel, UserWhereUniqueInput } from '@prisma/client';
import { BadRequest } from '@interfaces/badRequest.interface';

@Controller('user')
//   @Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private readonly postService: PostService,
  ) { }

  @Post('/')
  @HttpCode(201)
  async signup(@Response() res, @Body() userData): Promise<UserModel> {
    const newUser = await this.userService.create(userData)
    if (newUser.hasOwnProperty('id')) return res.json(newUser)
    return res.status(400).json(newUser)
  }

  @Get('/')
  async getMany(@Query() query): Promise<UserModel[]> {
    return this.userService.getMany(query)
  }

  @Get('/:id')
  async getOne(@Param('id') id: UserWhereUniqueInput): Promise<UserModel> {
    return this.userService.getOne(id)
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<UserModel> {
    return this.userService.delete({ id: Number(id) });
  }

  @Put('/:id')
  async update(@Body() userData, @Param('id') id: string): Promise<UserModel> {
    return this.userService.update({
      where: { id: Number(id) },
      data: { ...userData },
    });
  }


}