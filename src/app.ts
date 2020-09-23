import express from 'express'
import cors from 'cors'
import { PrismaClient, User } from "@prisma/client"

import { userRouter } from './routes/user.routes'

const bodyParser = require('body-parser')


const prisma = new PrismaClient()

class App {
    public server: express.Application

    public constructor() {
        this.server = express()
        this.middlewares()
        this.routes()
    }

    private middlewares(): void {
        this.server.use(express.json())
        this.server.use(cors())
        this.server.use(express.json())
        this.server.use(bodyParser.json())        
    }
    
    private routes(): void {
        this.server.use('/user', userRouter)
    }

}


export default new App().server