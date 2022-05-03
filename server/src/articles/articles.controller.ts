  import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UnauthorizedException} from '@nestjs/common';
  import {Request} from 'express';
  import { ArticlesService } from './articles.service';
  import {CreateArticleDto} from "./dto/create-article.dto";
  import {Article} from "./articles.schema";
  import {JwtService} from "@nestjs/jwt";

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService,
              private jwtService: JwtService,) {}
  @Get()
  getAll() {
    return this.articlesService.findAll()
  }
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.articlesService.findById(id)
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: CreateArticleDto, @Req() request: Request): Promise<Article> {
    const cookie = request.cookies['jwt']
    const data = await this.jwtService.verifyAsync(cookie);
    if(!data) {
      throw new UnauthorizedException();
    }
    const author_id = data.id;
    return this.articlesService.createArticle(createProductDto, author_id)
  }

}
