import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Article, ArticleSchema} from "./articles.schema";
import {User, UserSchema} from "../users/users.schema";
import {UsersService} from "../users/users.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [MongooseModule.forFeature([
      {name: Article.name, schema: ArticleSchema},
      {name: User.name, schema: UserSchema}
  ]),
      JwtModule.register({
          secret: 'secret',
          signOptions: { expiresIn: '24h' },
      }),],
  controllers: [ArticlesController],
  providers: [ArticlesService, UsersService]
})
export class ArticlesModule {}
