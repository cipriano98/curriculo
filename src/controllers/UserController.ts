import { User } from '@prisma/client'
import { UserService } from '@services/UserService'

const service: UserService = new UserService()

export class UserController {
  public async create (user: User) {
    const { email } = user

    try {
      const existsUser = await service.getByEmail(email)

      if (!existsUser) {
        const newUser = await service.create(user)
        return newUser
      }

      return { message: 'Usuário já existe em nossa base de dados' }
    } catch (error) {
      throw new Error(`Erro não reconhecido: ${error?.error ? error.error : (
                error?.message ? error.message : error
            )}`)
    }
  }

  public async getById (id: string) {
    const getUser = await service.getById(id)
    return getUser
  }

  public async getAll () {
    const getUser = await service.getAll()
    return getUser
  }

  public async delete (id: string) {
    const deleteUser = await service.delete(id)
    return { message: `Usuário ${deleteUser.id} deletado com sucesso!` }
  }

  public async update (user: User, id: string) {
    const updateUser = await service.update(user, id)
    return {
      message: `Usuário ${updateUser.id} atualizado com sucesso!`,
      data: updateUser
    }
  }
}
