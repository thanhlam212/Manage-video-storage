import { User } from '@prisma/client';
import { Controller, Post, Body, BadRequestException, UseGuards, Req, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto/login-user.dto';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './strategies/jwt-auth';
import { error } from 'console';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.register(createUserDto);
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      console.log(error);
      throw new BadRequestException('Failed to register user.');
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const { accessToken } = await this.usersService.login(loginUserDto.username, loginUserDto.password);
      return { accessToken };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to login.');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req){
    try{
      const user = req.user;
      await this.usersService.logout(user.id);
      return { message: 'Logout successfully !'};
    }catch (error){
      console.log(error);
      throw new BadRequestException('Failed to logout.')
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const userId = req.user?.id; // Ensure userId is being accessed correctly
    if (!userId) {
      throw new Error('User ID is missing from request');
    }
    
    try {
      return await this.usersService.getUserById(userId);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to fetch user profile');
    }
  }
}
