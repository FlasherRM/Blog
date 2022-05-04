import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Article, ArticleDocument} from "../articles/articles.schema";
import {Model} from "mongoose";
import {User, UserDocument} from "./users.schema";
import {CreateArticleDto} from "../articles/dto/create-article.dto";
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }
    async findById(id: number) {
        return this.userModel.findById(id)
    }
    async findByEmail(email: string) {
        return this.userModel.findOne({email})
    }
    async LoginUser(userDto: CreateUserDto) {
        userDto.password = await bcrypt.hash(userDto.password, 10)
        const newUser = new this.userModel(userDto)
        return newUser.save()
    }
    async HandleSubscribe(subscriber_id, followed_id) {
        const sub = await this.userModel.findById(subscriber_id);
        const fol = await this.userModel.findById(followed_id);

        if(fol.subscribers.includes(subscriber_id) && sub.follows.includes(followed_id) || sub.follows.includes(followed_id) || fol.subscribers.includes(subscriber_id)) {
            return {
                success: false,
                message: "You are already registered to him"
            }
        }

        fol.subscribers.push(subscriber_id)
        sub.follows.push(followed_id)


        sub.save()
        fol.save()

        return {
            fol: fol.name,
            sub: sub.name
        }
    }
    async HandleUnsubscribe(subscriber_id, followed_id) {
        const sub = await this.userModel.findById(subscriber_id);
        const fol = await this.userModel.findById(followed_id);

        if(!fol.subscribers.includes(subscriber_id) && !sub.follows.includes(followed_id)) {
            return {
                success: false,
                message: "YOU WEREN'T SUBSCRIBED HIM"
            }
        }


        fol.subscribers.splice(fol.subscribers.indexOf(subscriber_id), 1);
        sub.follows.splice(sub.follows.indexOf(followed_id), 1);

        fol.save()
        sub.save()

        return {
            success: true,
            fol: fol.name,
            sub: sub.name
        }
    }
}
