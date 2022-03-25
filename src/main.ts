import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'crm',
      protoPath: [
        join(__dirname, '../protos/crm.proto'),
        join(__dirname, '../protos/hero.proto'),
        join(__dirname, '../protos/product.proto'),
      ],
      loader: {
        keepCase: true
      }
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
