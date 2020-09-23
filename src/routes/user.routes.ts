import { User } from '@prisma/client';
import { Router } from 'express'

import { UserController } from '../controller/UserController';
const userController: UserController = new UserController

const userRouter: Router = Router();

userRouter.post('/',
    //   middleware.useCORS,
    //   middleware.rateLimit,
    // + any other middleware 
    async (req, res) => {
        const user: User = req.body
        const newUser = await userController.create(user)
        res.status(201).json(newUser)
    }
);

userRouter.get('/',
    async (req, res) => {
        const getUser = await userController.getAll()
        res.status(200).json(getUser)
    }
);

userRouter.get('/:userId',
    async (req, res) => {
        const { userId } = req.params
        const getUser = await userController.getById(userId)
        res.status(200).json(getUser)
    }
);

userRouter.delete('/:userId',
    async (req, res) => {
        const { userId } = req.params
        const deleteUser = await userController.delete(userId)
        res.status(200).json(deleteUser)
    }
);


userRouter.put('/:userId',
    async (req, res) => {
        const { userId } = req.params
        const user: User = req.body
        const deleteUser = await userController.update(user, userId)
        res.status(200).json(deleteUser)
    }
);

export { userRouter }