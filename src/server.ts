import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // const port = process.env.PORT || 3333
    // await app.listen(port, '0.0.0.0', () => {
    //     console.clear()
    //     console.log(`\n${process.env.npm_package_NAME} is running in http://localhost:${80}`)
    //     console.log(process.env.npm_package_DESCRIPTION)
    //     console.log(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}\n`);
    // });
      app.listenAsync(80, '0.0.0.0');
}
bootstrap()

