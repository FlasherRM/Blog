import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MongooseModule} from "@nestjs/mongoose";
import {ArticlesModule} from "./articles/articles.module";
import { UsersModule } from './users/users.module';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      MongooseModule.forRoot(process.env.DATABASE_CONNECT),
      ArticlesModule,
      UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
