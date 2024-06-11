import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto/login-user.dto';
import axios from 'axios';


const BASE_URL = 'http://localhost:3000';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const url = `${BASE_URL}/users/register`;
      const response = await axios.post(url, createUserDto);
      return response.data;
    } catch (error) {
      throw new BadRequestException('Failed to register user.');
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const url = `${BASE_URL}/users/login`;
      const response = await axios.post(url, loginUserDto);
      return response.data;
    } catch (error) {
      throw new BadRequestException('Failed to login.');
    }
  }
}
