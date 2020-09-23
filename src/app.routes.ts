import { Router } from 'express'
import { userRouter } from './routes/user.routes'
import { curriculoRouter } from './routes/curriculo.routes'


const appRouter: Router = Router();


appRouter.use('/user', userRouter);
appRouter.use('/user/curriculo', curriculoRouter)


export { appRouter }