import { Injectable } from "@nestjs/common";
import { User, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

@Injectable()
export class UserService {

    async create(user: User) {
        const newUser: User = await prisma.user.create({
            data: {
                ...user
            }
        })
        return newUser
    }

    async getById(id: string) {
        const getUser: User | null = await prisma.user.findOne({
            where: {
                id: Number(id)
            }
        })
        return getUser
    }

    async getAll() {
        const getUser = await prisma.user.findMany({
            // select: {
            //     id: true,
            //     email: true,
            //     firstname: true,
            //     lastname: true,
            //     role: true,
            //     createdat: true,
            //     updatedat: true,
            // },
        })
        return getUser
    }

    async delete(id: string) {
        const deleteUser = await prisma.user.delete({
            where: {
                id: Number(id),
            },
        })
        return deleteUser
    }

    async update(user: User, id: string) {
        const updateUser = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                ...user
            },
        })
        return updateUser
    }

    async getByEmail(email: string) {
        const getByEmail = await prisma.user.findOne({
            select: {
                email: true
            },
            where: { email: email },
        })
        return getByEmail
    }
}