import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import * as mongoose from "mongoose";
import {Type} from "class-transformer";
import {User} from "../users/users.schema";

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
    @Prop({ required: true })
    title: string

    @Prop()
    content: string;

    @Prop({default: Date.now})
    date_added: Date

    @Prop({ ref: User.name })
    @Type(() => User)
    author: User;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);