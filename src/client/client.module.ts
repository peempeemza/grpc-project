import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { join } from 'path';
dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CRM',
        transport: Transport.GRPC,
        options: {
          package: 'crm',
          protoPath:[
            join(__dirname, '../../protos/crm.proto'),
            join(__dirname, '../../protos/hero.proto'),
            join(__dirname, '../../protos/product.proto'),
          ],
          loader: {
            keepCase: true
          }
        },
      },
    ]),
  ],
  controllers: [ClientController,ProductController],
  providers: [],
})
export class ClientModule { }
