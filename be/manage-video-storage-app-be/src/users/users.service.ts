import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findByUsername(username);
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
    const payload = { username: user.username };
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
}
