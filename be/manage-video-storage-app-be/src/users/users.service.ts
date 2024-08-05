import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/service/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }
  async register(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;

    const existingUser = await this.usersRepository.findByUsername(username);
    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    return this.usersRepository.createUser(createUserDto);
  }

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.validateUser(username, password);
    const payload = {id: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  private async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersRepository.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    return user;
  }

  async logout(userId: number): Promise<void> {
    
  }
}
