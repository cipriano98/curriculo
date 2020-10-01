import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // const port = process.env.PORT || 3333
    await app.listen(process.env.PORT || 3333, '0.0.0.0', () => {
        // console.clear()
        console.log(`\n${process.env.npm_package_NAME} is running in http://localhost:${process.env.PORT || 3333}`)
        // console.log(process.env.npm_package_DESCRIPTION)
        console.log(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}\n`);
    });
    //   app.listenAsync(port, '0.0.0.0');
}
bootstrap()
