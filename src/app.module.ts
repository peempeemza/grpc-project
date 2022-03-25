import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nestjs-knex';
import * as dotenv from 'dotenv';
import { ClientModule } from './client/client.module'
dotenv.config();

@Module({
  imports: [
    ClientModule,
    KnexModule.forRoot({
      config: {
        client: 'mysql2',
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          port: +process.env.DB_PORT,
          password: process.env.DB_PWD,
          database: process.env.DB_NAME,
        },
        pool: { min: 2, max: 10 },
        useNullAsDefault: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
