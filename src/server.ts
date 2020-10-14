import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnlessMiddleware } from './middleware/router/unless.middleware';
import { TokenMiddleware } from './middleware/token/token.middleware';
/**
 * export const globalPrefix = '/api/v1'
 */
export const globalPrefix = '/api/v1'
/**
 * unless Middleware
 */
const unlessMiddleware = new UnlessMiddleware()
/**
 * token Middleware
 */
const tokenMiddleware = new TokenMiddleware()
/**
 * hot reload
 */
declare const module: any;


export class Server {

    async bootstrap() {
        const app = await NestFactory.create(AppModule);

        app.setGlobalPrefix(globalPrefix);

        app.use(unlessMiddleware.use(
            tokenMiddleware.use,
            `${globalPrefix}/user/signin`,
            `${globalPrefix}/health/status`,
        ))

        const server = await app.listen(process.env.PORT || 3333, '0.0.0.0', () => {
            console.clear()
            console.log(`
                 ######  ##     ## ########  ########  ####  ######  ##     ## ##        #######     ##     ## ##    ## ####  ######   #######  
                ##    ## ##     ## ##     ## ##     ##  ##  ##    ## ##     ## ##       ##     ##    ##     ## ###   ##  ##  ##    ## ##     ## 
                ##       ##     ## ##     ## ##     ##  ##  ##       ##     ## ##       ##     ##    ##     ## ####  ##  ##  ##       ##     ## 
                ##       ##     ## ########  ########   ##  ##       ##     ## ##       ##     ##    ##     ## ## ## ##  ##  ##       ##     ## 
                ##       ##     ## ##   ##   ##   ##    ##  ##       ##     ## ##       ##     ##    ##     ## ##  ####  ##  ##       ##     ## 
                ##    ## ##     ## ##    ##  ##    ##   ##  ##    ## ##     ## ##       ##     ##    ##     ## ##   ###  ##  ##    ## ##     ## 
                 ######   #######  ##     ## ##     ## ####  ######   #######  ########  #######      #######  ##    ## ####  ######   #######
            `)
            console.log(`\n${process.env.npm_package_NAME} is running in http://localhost:${server.address().port + globalPrefix}`)
            console.log(process.env.npm_package_DESCRIPTION)
            console.log(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}\n`);
        });

        if (module.hot) {
            module.hot.accept();
            module.hot.dispose(() => app.close());
        }
    }
}