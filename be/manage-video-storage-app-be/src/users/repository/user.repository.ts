import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto/create-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/service/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email, fullName, phoneNumber } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        fullName,
        phoneNumber,
      },
    });
  }
}
