import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const port = process.env.PORT || 3333
    await app.listen(3333, '0.0.0.0', () => {
        // console.clear()
        console.log(`\n${process.env.npm_package_NAME} is running in http://localhost:${port}`)
        // console.log(process.env.npm_package_DESCRIPTION)
        console.log(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}\n`);
    });
    //   app.listenAsync(port, '0.0.0.0');
}
bootstrap()

