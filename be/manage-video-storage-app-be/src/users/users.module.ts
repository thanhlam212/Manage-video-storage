import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './repository/user.repository';
import { UsersController } from './users.controller'; // Thêm import
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'prisma/service/prisma.service';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60m' },
  })],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, PrismaService],
  exports: [UsersService],
})
export class UserModule {}
