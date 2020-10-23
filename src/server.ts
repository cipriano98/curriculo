import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnlessMiddleware } from './middleware/router/unless.middleware';
import { TokenMiddleware } from './middleware/token/token.middleware';
// import chalk = require('chalk')

/**
 * Prefixo global
 */
export const globalPrefix = '/api/v1'

/**
 * Token middleware
 */
const tokenMiddleware = new TokenMiddleware().use

/**
 * Unless middleware
 */
const unlessMiddleware = new UnlessMiddleware().use

/**
 * hot reload
 */
declare const module: any;


export class Server {

    constructor(
        // ? /**
        // ?  * token Middleware
        // ?  */
        // ? private readonly tokenMiddleware: TokenMiddleware,
        // ? /**
        // ?  * unless Middleware
        // ?  */
        // ? private readonly unlessMiddleware: UnlessMiddleware
    ) {
        this.bootstrap()
    }

    async bootstrap() {
        const app = await NestFactory.create(AppModule);

        app.setGlobalPrefix(globalPrefix);

        app.use(unlessMiddleware(
            tokenMiddleware,
            // `${globalPrefix}/user/signup`,
            `${globalPrefix}/user/signin`,
            `${globalPrefix}/health/status`,
        ))

        const server = await app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
            console.clear()
            const url = process.env.NODE_ENV === 'production' ?
                `https://curriculo-unico.herokuapp.com${globalPrefix}/health/status` :
                `http://localhost:${server.address().port + globalPrefix}/health/status`

            // console.log(`\n[${chalk.bold.hex('#28f000')(process.env.npm_package_NAME.toUpperCase())}] is running in ${chalk.blue.underline(`http://localhost:${server.address().port + globalPrefix}`)}`)
            console.log(`[${process.env.SERVER_NAME.toUpperCase()}] is running in ${url}`)
            console.log(process.env.SERVER_DESCRIPTION)
            console.log(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}\n`);
        });
        if (module.hot) {
            module.hot.accept();
            module.hot.dispose(() => app.close());
        }
    }
}