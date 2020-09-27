import { NestFactory } from '@nestjs/core';
import { RoutesMapper } from '@nestjs/core/middleware/routes-mapper';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/api', RoutesMapper)

  const port = process.env.PORT || 3333
  await app.listen(port, '0.0.0.0', () => {
    console.clear()
    console.log(`\nApp inicializado em http://localhost:${port}`)
    console.log(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}\n`);
  });
}
bootstrap();
 