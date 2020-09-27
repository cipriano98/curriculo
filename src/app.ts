import express from 'express'
import cors from 'cors'

import { appRouter } from './app.routes'

const bodyParser = require('body-parser')

class App {

    public server: express.Application

    public constructor() {
        this.server = express()
        this.middlewares()
        this.routes()
    }

    private middlewares(): void {
        this.server.use(cors())
        this.server.use(express.json())
        // ? this.server.use(bodyParser.json())
    }

    private routes(): void {
        this.server.use('/api', appRouter)
        // TODO: this.server.use('/api/curriculo', apiRouter)
    }
}

export default new App().server
