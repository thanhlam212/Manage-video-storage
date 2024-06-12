import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user';
import { CreateUserDto } from '../dto/create-user.dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return this.repository.findOne({ where: { username } });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email, fullName, phoneNumber } = createUserDto;

    try {
      const user = new User();
      user.username = username;
      user.password = await this.hashPassword(password); // Hash password
      user.email = email;
      user.fullName = fullName;
      user.phoneNumber = phoneNumber;

      return await this.repository.save(user);
    } catch (error) {
      // Handle specific database constraints or other errors
      throw new BadRequestException('Failed to create user');
    }
  }
}
