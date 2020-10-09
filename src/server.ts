import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    app.setGlobalPrefix('/api/v1');

    const server = await app.listen(process.env.PORT || 3333, '0.0.0.0', () => {
        console.clear()
        // console.dir(server)
        console.log(`\n${process.env.npm_package_NAME} is running in http://localhost:${server.address().port}`)
        console.log(process.env.npm_package_DESCRIPTION)
        console.log(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}\n`);
    });
}
bootstrap()