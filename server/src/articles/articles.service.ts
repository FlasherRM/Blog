import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Article, ArticleDocument} from "./articles.schema";
import { Model } from 'mongoose'
import {CreateArticleDto} from "./dto/create-article.dto";
import {UsersService} from "../users/users.service";

@Injectable()
export class ArticlesService {
    constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
                private readonly usersService: UsersService) {
    }
    async findAll(): Promise<Article[]> {
        return this.articleModel.find().exec()
    }
    async findById(id: string): Promise<Article> {
        return this.articleModel.findById(id)
    }
    async createArticle(articleDto: CreateArticleDto, author_id: number) {
        const newArticle = new this.articleModel(articleDto)
        newArticle.author = await this.usersService.findById(author_id)
        return newArticle.save()
    }

}
