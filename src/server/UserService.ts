import { User } from "@prisma/client"
import { prisma } from "../utils/constants";


export class UserService {

    constructor() {

    }

    public async create(user: User) {
        const newUser: User = await prisma.user.create({
            data: {
                ...user
            }
        })
        return newUser
    }

    public async getById(id: string) {
        const getUser: User | null = await prisma.user.findOne({
            where: {
                id: Number(id)
            }
        })
        return getUser
    }

    public async getAll() {
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

    public async delete(id: string) {
        const deleteUser = await prisma.user.delete({
            where: {
                id: Number(id),
            },
        })
        return deleteUser
    }

    public async update(user: User, id: string) {
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

    public async getByEmail(email: string) {
        const getByEmail = await prisma.user.findOne({
            select: {
                email: true
            },
            where: { email: email },
        })
        return getByEmail
    }
}