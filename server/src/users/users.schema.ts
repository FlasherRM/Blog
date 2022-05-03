import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {Article} from "../articles/articles.schema";
export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop()
    password: string;

    @Prop({default: Date.now})
    registered: Date

    @Prop({ default: []})
    articles: string[];

    // @Prop({ default: []})
    @Prop({default: []})
    subscribers: string[];

    @Prop({default: []})
    follows: string[];

}

export const UserSchema = SchemaFactory.createForClass(User);