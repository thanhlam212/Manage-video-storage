import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user/user';
import { CreateUserDto } from '../dto/create-user.dto/create-user.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email, fullName, phoneNumber } = createUserDto;

    try {
      const user = new User();
      user.username = username;
      user.password = await this.hashPassword(password); // Hash password
      user.email = email;
      user.fullName = fullName;
      user.phoneNumber = phoneNumber;

      return await this.save(user);
    } catch (error) {
      // Handle specific database constraints or other errors
      throw new BadRequestException('Failed to create user');
    }
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.findOne({ where: { username } });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
