import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { User } from '@prisma/client'
import { UserService } from './user.service'

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('/')
  async create (user: User) {
    const { email } = user

    try {
      const existsUser = await this.userService.getByEmail(email)

      if (!existsUser) {
        const newUser = await this.userService.create(user)
        return newUser
      }

      return { message: 'Usuário já existe em nossa base de dados' }
    } catch (error) {
      throw new Error(`Erro não reconhecido: ${error?.error ? error.error : (
                error?.message ? error.message : error
            )}`)
    }
  }

  @Get('/:id')
  async getById (@Param('id') id: string) {
    const getUser = await this.userService.getById(id)
    return getUser
  }

  @Get('/')
  async getAll () {
    const getUser = await this.userService.getAll()
    return getUser
  }

  @Delete('/:id')
  async delete (@Param('id') id: string) {
    const deleteUser = await this.userService.delete(id)
    return { message: `Usuário ${deleteUser.id} deletado com sucesso!` }
  }

  @Put('/:id')
  async update (@Body() user: User, @Param('id') id: string) {
    const updateUser = await this.userService.update(user, id)
    return {
      message: `Usuário ${updateUser.id} atualizado com sucesso!`,
      data: updateUser
    }
  }
}
