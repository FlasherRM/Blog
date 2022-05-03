import {BadRequestException, Body, Controller, Get, HttpException, Param, Post, Res} from '@nestjs/common';
import {Response} from 'express'
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService,
              private jwtService: JwtService,) {}
  @Get('user/:id')
  getUserById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }
  @Post('register')
  async register(
      @Body() userDto: CreateUserDto,
      @Res({ passthrough: true }) response: Response
  )
  {
    const candidate = await this.usersService.findByEmail(userDto.email);
    if(candidate) {
      return new HttpException(`User with email ${userDto.email} already exist`, 400)
    }
    const newuser = this.usersService.LoginUser(userDto)
    return {
      message: "USER SUCCESSFULLY REGISTERED"
    }
  }
  @Post('login')
  async login(
      @Body('email') email: string,
      @Body('password') password: string,
      @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid Password or Email');
    }
    const jwt = await this.jwtService.signAsync({
      id: user.id,
    });
    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'success',
    };
  }
  @Post('sub')
  async subscribe(@Body('sub_id') sub_id: string, @Body('fol_id') fol_id: string) {
    const result = await this.usersService.HandleSubscribe(sub_id, fol_id);
    return {
      message: `${result.sub} SUCCESSFULLY SUBSCRIBED TO ${result.fol}`
    }
  }
}
